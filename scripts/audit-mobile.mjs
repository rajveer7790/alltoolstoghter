import assert from 'node:assert/strict';
import http from 'node:http';
import { existsSync, readFileSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
import { chromium } from 'playwright';

const root = resolve('out');
const catalog = JSON.parse(readFileSync(resolve(root, 'internal-link-audit.json'), 'utf8')).tools;
const totalTools = catalog.length;
const artifacts = resolve('mobile-audit');
mkdirSync(artifacts, { recursive: true });
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.txt': 'text/plain' };
const server = http.createServer((req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const base = resolve(root, '.' + path);
    if (base !== root && !base.startsWith(root + sep)) { res.writeHead(403); res.end(); return; }
    const file = [base, base + '.html', resolve(base, 'index.html')].find(p => existsSync(p) && statSync(p).isFile());
    if (!file) { res.writeHead(404); res.end('Not found'); return; }
    res.setHeader('Content-Type', types[extname(file)] || 'application/octet-stream');
    res.end(readFileSync(file));
  } catch { res.writeHead(400); res.end('Bad request'); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = 'http://127.0.0.1:' + server.address().port;
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
const failures = [], measurements = [], runtimeErrors = [];
let captures = 0;
context.on('page', page => page.on('pageerror', error => runtimeErrors.push({ url: page.url(), error: error.message })));
const capture = async (page, label) => {
  if (captures++ < 15) await page.screenshot({ path: resolve(artifacts, label + '.png'), fullPage: false });
};
const checkLayout = async (page, path, width) => {
  await page.setViewportSize({ width, height: 844 });
  const response = await page.goto(origin + path, { waitUntil: 'networkidle' });
  assert.equal(response.status(), 200, path);
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const metric = await page.evaluate(() => ({
    width: innerWidth, clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    drawerCount: document.querySelectorAll('.drawer').length,
    offenders: [...document.querySelectorAll('body *')].filter(el => {
      const box = el.getBoundingClientRect();
      return box.width > 0 && (box.right > innerWidth + 1 || box.left < -1);
    }).slice(0, 12).map(el => ({ tag: el.tagName, class: el.className?.toString(), text: el.textContent?.slice(0, 90) })),
  }));
  measurements.push({ path, ...metric });
  if (metric.scrollWidth > metric.clientWidth + 1 || metric.drawerCount !== 0) {
    failures.push({ path, ...metric });
    await capture(page, 'overflow-' + width + '-' + path.replace(/[^a-z0-9]/gi, '-'));
  }
};

try {
  const page = await context.newPage();
  const widths = [320, 360, 390, 414, 768, 921, 1024, 1280];
  const representative = ['/', '/tools', '/finance', '/finance/mortgage-calculator', '/unit-converters/cm-to-inches', '/guides'];
  for (const width of widths) for (const path of representative) await checkLayout(page, path, width);

  await checkLayout(page, '/', 390);
  await capture(page, 'home-390');
  const toggle = page.getByRole('button', { name: 'Open menu', exact: true });
  const panel = page.getByRole('dialog', { name: 'Browse tools' });
  const closed = async () => {
    assert.equal(await panel.count(), 0, 'Drawer removed after close');
    assert.equal(await page.evaluate(() => document.body.style.overflow), '', 'Page scroll restored');
  };
  await toggle.click();
  await panel.waitFor({ state: 'visible' });
  const box = await panel.boundingBox();
  assert.ok(box && box.x >= 0 && box.x + box.width <= 391 && box.y === 0 && Math.abs(box.height - 844) <= 1, 'Drawer fits full viewport');
  assert.equal(await page.evaluate(() => document.body.style.overflow), 'hidden');
  const close = panel.getByRole('button', { name: 'Close menu' });
  assert.equal(await close.evaluate(el => el === document.activeElement), true);
  await page.keyboard.press('Shift+Tab');
  const lastLink = panel.getByRole('link').last();
  assert.equal(await lastLink.evaluate(el => el === document.activeElement), true, 'Reverse focus wraps');
  await page.keyboard.press('Tab');
  assert.equal(await close.evaluate(el => el === document.activeElement), true, 'Forward focus wraps');
  await lastLink.scrollIntoViewIfNeeded();
  assert.equal(await lastLink.isVisible(), true, 'Last category reachable');
  await capture(page, 'menu-390');
  await page.keyboard.press('Escape');
  await closed();
  assert.equal(await toggle.evaluate(el => el === document.activeElement), true, 'Focus restored');
  await toggle.click(); await close.click(); await closed();
  await toggle.click(); await page.locator('.drawer-backdrop').click({ position: { x: 5, y: 300 } }); await closed();
  await toggle.click(); await panel.getByRole('link', { name: 'All tools', exact: true }).click();
  await page.waitForURL(origin + '/tools');
  await closed();
  const search = page.getByRole('searchbox', { name: 'Search tools' });
  await search.fill('mortgage');
  await page.waitForFunction(() => {
    const count = document.querySelectorAll('.ilp-card').length;
    return count > 0 && count < document.querySelector('.ilp-tab-n').textContent * 1;
  });
  assert.equal(new URL(page.url()).searchParams.get('q'), 'mortgage');
  await search.fill('');
  await page.waitForFunction(total => document.querySelectorAll('.ilp-card').length === total, totalTools);
  assert.equal(new URL(page.url()).searchParams.has('q'), false);
  await checkLayout(page, '/', 1280);
  await page.getByRole('button', { name: 'Money', exact: true }).click();
  assert.equal(await page.locator('.mega.show').count(), 1);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.mega.show').count(), 0);
  await page.locator('.header-cta').click();
  await page.waitForURL(origin + '/tools');

  // Every canonical tool, including less prominent routes, at a phone width.
  const tools = catalog;
  let cursor = 0;
  await Promise.all(Array.from({ length: 3 }, async () => {
    const worker = await context.newPage();
    while (cursor < tools.length) {
      const tool = tools[cursor++];
      await checkLayout(worker, tool.path, 360);
    }
    await worker.close();
  }));
  const summary = {
    layoutMeasurements: measurements.length, canonicalToolsChecked: tools.length,
    widths, maximumOverflow: Math.max(...measurements.map(m => m.scrollWidth - m.clientWidth)),
    menuInteractions: 'open, full-height containment, category scrolling, focus trap, Escape, close button, backdrop, route close, focus/scroll restore',
    search: 'query and clear', failures, runtimeErrors,
  };
  writeFileSync(resolve(artifacts, 'report.json'), JSON.stringify({ summary, measurements }, null, 2));
  console.log(JSON.stringify(summary, null, 2));
  assert.equal(failures.length, 0, 'Horizontal overflow or closed drawer found');
  assert.equal(runtimeErrors.length, 0, 'Browser JavaScript errors');
} finally {
  await context.close();
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
