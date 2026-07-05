/**
 * Minimal persistent key-value store backed by a JSON file, with an in-memory cache.
 * Dependency-free and portable. For production scale, swap this module for
 * Redis, Cloudflare KV, or Postgres — the interface (get/set/all) stays the same.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

export class JsonStore {
  constructor(file) {
    this.file = file;
    this.cache = new Map();
    mkdirSync(dirname(file), { recursive: true });
    if (existsSync(file)) {
      try { this.cache = new Map(Object.entries(JSON.parse(readFileSync(file, 'utf8')))); }
      catch { this.cache = new Map(); }
    }
  }
  get(key) { return this.cache.get(key) ?? null; }
  has(key) { return this.cache.has(key); }
  set(key, value) { this.cache.set(key, value); this._flush(); }
  all() { return Object.fromEntries(this.cache); }
  _flush() {
    try { writeFileSync(this.file, JSON.stringify(this.all(), null, 2)); }
    catch (e) { console.error('store flush failed:', e.message); }
  }
}
