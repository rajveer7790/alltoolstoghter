'use client';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { DOCUMENT_TOOLS, BENTO_TOOLS, BENTO_URL, DOCUMENT_API, PDF_EDITOR_URL, type DocumentTool } from '@/lib/documents/catalog';
import DocumentWorkbench from './DocumentWorkbench';
import { FileDrop } from '@/components/widgets/pdfShared';

const validWorkspace = (value: string) => { try { const url = new URL(value, typeof window === 'undefined' ? 'https://alltoolstogether.com' : window.location.origin); return url.protocol === 'https:' || url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname) ? url.href.replace(/\/$/, '') : ''; } catch { return ''; } };

function OfficeEditor({ available }: { available: boolean }) {
  const [file, setFile] = useState<File>();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [url, setUrl] = useState('');
  const start = async () => {
    if (!file || !available) return;
    setBusy(true); setError(''); setUrl('');
    try {
      const body = new FormData(); body.append('file', file);
      const response = await fetch(DOCUMENT_API + '/office/start', { method: 'POST', body, signal: AbortSignal.timeout(60000) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'The editor could not open this file.');
      const target = validWorkspace(data.editorUrl);
      if (!target) throw new Error('The editor returned an invalid session URL.');
      setUrl(target);
    } catch (error) { setError(error instanceof Error ? error.message : 'The editor is unavailable.'); }
    finally { setBusy(false); }
  };
  return <section className="ds-workbench"><span className="ds-badge ds-server">OFFICE WORKSPACE</span><h2>Edit documents, spreadsheets and slides</h2><p>Use the self-hosted ONLYOFFICE editor to edit DOCX, XLSX and PPTX files. Office sessions use temporary server storage and expire after one hour; save and download your file before leaving.</p>
    {!available && <p className="availability-note">The Office editor is not available on this deployment yet. You can use the local PDF editor or document tools below.</p>}
    <FileDrop accept=".docx,.xlsx,.pptx,.odt,.ods,.odp" label="Choose an Office file" onFiles={files => { if (!busy) { setFile(files[0]); setUrl(''); setError(''); } }} />
    {file && <p>{file.name}</p>}<div className="btn-row"><button type="button" className="btn btn-primary" disabled={!file || !available || busy} onClick={start}>{busy ? 'Preparing editor…' : 'Upload & prepare editor'}</button>{url && <a className="btn btn-primary" href={url} target="_blank" rel="noopener noreferrer">Open editor ↗</a>}</div>
    {error && <p role="alert" className="ds-error">{error}</p>}<p className="ds-note">Powered by ONLYOFFICE Community Edition. Server capacity and the upstream edition limits apply.</p>
  </section>;
}

export default function DocumentStudio() {
  const [selected, setSelected] = useState('pdf-editor');
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('All');
  const [tab, setTab] = useState('studio');
  const [remote, setRemote] = useState<DocumentTool[]>([]);
  const [connection, setConnection] = useState<'checking' | 'online' | 'offline'>(DOCUMENT_API ? 'checking' : 'offline');
  const [bento, setBento] = useState(BENTO_URL);
  const [office, setOffice] = useState(false);
  useEffect(() => {
    const sync = () => { const id = new URLSearchParams(window.location.search).get('tool'); if (id) setSelected(id); };
    sync(); window.addEventListener('popstate', sync);
    if (!DOCUMENT_API) return () => window.removeEventListener('popstate', sync);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    fetch(DOCUMENT_API + '/capabilities', { signal: controller.signal }).then(response => { if (!response.ok) throw new Error(); return response.json(); })
      .then(data => { setRemote(data.tools || []); setConnection('online'); setBento(data.workspaces?.bento || BENTO_URL); setOffice(!!data.officeEditor?.available); })
      .catch(() => setConnection('offline')).finally(() => clearTimeout(timeout));
    return () => { controller.abort(); clearTimeout(timeout); window.removeEventListener('popstate', sync); };
  }, []);
  const tools = useMemo(() => [...DOCUMENT_TOOLS.map(tool => tool.mode === 'server' ? { ...tool, ...remote.find(candidate => candidate.id === tool.id) } : tool), ...remote.filter(tool => !DOCUMENT_TOOLS.some(existing => existing.id === tool.id))], [remote]);
  const filtered = tools.filter(tool => (group === 'All' || tool.group === group) && (tool.name + ' ' + tool.description + ' ' + tool.engine).toLowerCase().includes(query.toLowerCase()));
  const groups = ['All', ...new Set(tools.map(tool => tool.group))];
  const active = tools.find(tool => tool.id === selected) || tools[0];
  const choose = (id: string) => { setSelected(id); setTab('studio'); const url = new URL(window.location.href); url.searchParams.set('tool', id); window.history.replaceState(null, '', url.pathname + url.search); };
  const bentoBase = validWorkspace(bento);
  return <>
    <div className="ds-tabs" role="group" aria-label="Document workspace">
      <button type="button" aria-pressed={tab === 'studio'} onClick={() => setTab('studio')}>Document tools</button>
      <button type="button" aria-pressed={tab === 'office'} onClick={() => setTab('office')}>Office editor</button>
      <button type="button" aria-pressed={tab === 'toolkit'} onClick={() => setTab('toolkit')}>Full PDF toolkit <span>{BENTO_TOOLS.length}</span></button>
      <Link href={PDF_EDITOR_URL} prefetch={false}>Full PDF editor ↗</Link>
    </div>
    {tab === 'studio' && <div className="ds-studio-layout"><aside className="ds-library" aria-label="Choose a document tool">
      <label htmlFor="document-tool-search">Find a tool</label><input id="document-tool-search" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Word, OCR, tables…" />
      <label className="ds-sr-only" htmlFor="document-group">Filter by task</label><select id="document-group" value={group} onChange={e => setGroup(e.target.value)}>{groups.map(value => <option key={value}>{value}</option>)}</select>
      <p className="ds-library-status">{filtered.length} tools · {connection === 'online' ? 'server connected' : connection === 'checking' ? 'checking server' : 'local tools ready'}</p>
      <div className="ds-tool-list">{filtered.map(tool => <button type="button" key={tool.id} aria-pressed={active.id === tool.id} onClick={() => choose(tool.id)}><span>{tool.name}</span><small>{tool.mode === 'workspace' ? 'Complete workspace' : tool.mode === 'local' ? 'On your device' : tool.available ? 'Server ready' : 'Server unavailable'}</small></button>)}</div>
      {!filtered.length && <p>No matching tools. Try a different search.</p>}
    </aside><DocumentWorkbench key={active.id} tool={active} ready={active.mode === 'server' ? !!active.available : undefined} unavailableReason={active.unavailableReason} /></div>}
    {tab === 'office' && <OfficeEditor available={office} />}
    {tab === 'toolkit' && <section className="ds-workbench"><span className="ds-badge">EXTENDED PDF WORKSPACE</span><h2>Every task, in one place</h2><p>The isolated BentoPDF workspace includes conversion, page organization, forms, annotations, security and repair tools. It retains its own open-source notices. Individual tool availability depends on that workspace and its optional engines.</p>
      {!bentoBase && <p className="availability-note">The extended workspace has not been connected on this deployment. Use the local <Link href={PDF_EDITOR_URL}>full PDF editor</Link> or the document tools tab.</p>}
      {bentoBase && <a href={bentoBase} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Open full PDF toolkit ↗</a>}
      <ul className="ds-toolkit-grid">{BENTO_TOOLS.map(tool => <li key={tool.id}>{bentoBase ? <a href={bentoBase + '/' + tool.id + '.html'} target="_blank" rel="noopener noreferrer">{tool.name.replace(/-/g, ' ')}</a> : <span>{tool.name.replace(/-/g, ' ')}</span>}</li>)}</ul>
    </section>}
  </>;
}
