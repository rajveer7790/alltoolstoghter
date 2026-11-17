'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { DOCUMENT_API, PDF_EDITOR_URL, defaultsFor, type DocumentTool } from '@/lib/documents/catalog';
import { FileDrop, formatBytes } from '@/components/widgets/pdfShared';

export function PdfThumbnail({ file }: { file?: Blob }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [pages, setPages] = useState(0);
  useEffect(() => {
    setPages(0);
    if (!file) return;
    let stopped = false, document: any, task: any, render: any;
    (async () => {
      try {
        const { loadPdfjs } = await import('@/components/widgets/pdf/pdfjsLoader');
        const pdfjs = await loadPdfjs();
        if (stopped) return;
        task = pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) });
        document = await task.promise;
        if (stopped || !canvas.current) return;
        const page = await document.getPage(1);
        const original = page.getViewport({ scale: 1 });
        const viewport = page.getViewport({ scale: Math.min(180 / original.width, 220 / original.height) });
        const context = canvas.current.getContext('2d');
        if (!context || stopped) return;
        canvas.current.width = viewport.width; canvas.current.height = viewport.height;
        render = page.render({ canvasContext: context, viewport });
        await render.promise;
        if (!stopped) setPages(document.numPages);
      } catch { /* Unsupported/encrypted preview does not block the tool's own validation. */ }
      finally { await document?.destroy(); }
    })();
    return () => { stopped = true; render?.cancel(); task?.destroy(); };
  }, [file]);
  return <div className="ds-preview"><canvas ref={canvas} aria-label="First page preview" hidden={!pages} />{pages ? <p>{pages} {pages === 1 ? 'page' : 'pages'} · first page preview</p> : <p>PDF preview appears here when available.</p>}</div>;
}

export default function DocumentWorkbench({ tool, ready, unavailableReason }: { tool: DocumentTool; ready?: boolean; unavailableReason?: string }) {
  const [files, setFiles] = useState<Record<string, File[]>>({});
  const [options, setOptions] = useState(defaultsFor(tool));
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; url: string; name: string } | null>(null);
  const [remoteReady, setRemoteReady] = useState<boolean | undefined>(ready);
  const controller = useRef<AbortController | undefined>(undefined);
  const resultRef = useRef<string | undefined>(undefined);
  const serial = useRef(0);
  const isLocal = tool.mode === 'local';
  useEffect(() => () => { serial.current++; controller.current?.abort(); if (resultRef.current) URL.revokeObjectURL(resultRef.current); }, []);
  useEffect(() => {
    setFiles({}); setOptions(defaultsFor(tool)); setError(''); setResult(null); setBusy(false);
    setRemoteReady(ready); serial.current++; controller.current?.abort();
    if (resultRef.current) URL.revokeObjectURL(resultRef.current);
    if (tool.mode !== 'server' || ready !== undefined || !DOCUMENT_API) return;
    const abort = new AbortController();
    fetch(DOCUMENT_API + '/capabilities', { signal: abort.signal }).then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => setRemoteReady(data.tools.some((candidate: DocumentTool) => candidate.id === tool.id && candidate.available)))
      .catch(() => { if (!abort.signal.aborted) setRemoteReady(false); });
    return () => abort.abort();
  }, [tool.id, ready]);
  useEffect(() => () => { serial.current++; controller.current?.abort(); if (resultRef.current) URL.revokeObjectURL(resultRef.current); }, []);
  const uploads = tool.uploads || [{ key: 'files', label: 'Choose ' + (tool.multiple ? 'files' : 'a file'), accept: tool.accept, multiple: tool.multiple, required: true }];
  const chosen = Object.values(files).flat();
  const available = isLocal || !!remoteReady;
  const choose = (key: string, chosen: File[], accept: string, multiple: boolean) => {
    setError(''); setResult(null);
    if (chosen.length > 8 || chosen.some(file => file.size > 20 * 1024 * 1024 || !file.size)) { setError('Choose up to eight nonempty files, each smaller than 20 MB.'); return; }
    if (accept !== '*' && chosen.some(file => !accept.split(',').some(extension => file.name.toLowerCase().endsWith(extension)))) { setError('Choose a file in one of the supported formats: ' + accept); return; }
    setFiles(previous => ({ ...previous, [key]: multiple ? chosen : chosen.slice(0, 1) }));
  };
  const process = async () => {
    setError(''); setResult(null);
    if (!chosen.length) { setError('Choose a file first.'); return; }
    if (chosen.reduce((sum, file) => sum + file.size, 0) > 32 * 1024 * 1024) { setError('Keep the combined upload below 32 MB.'); return; }
    const current = ++serial.current;
    controller.current = new AbortController();
    const timeout = setTimeout(() => controller.current?.abort(), 360000);
    setBusy(true);
    try {
      let blob: Blob, name: string;
      if (isLocal) {
        const { processLocalDocument } = await import('@/lib/documents/local');
        const output = await processLocalDocument(tool.id, chosen, options);
        blob = new Blob([output.bytes], { type: output.type }); name = output.filename;
      } else {
        if (!available || !DOCUMENT_API) throw new Error('This processing service is unavailable right now. Try one of the local PDF tools.');
        const data = new FormData();
        data.append('options', JSON.stringify(options));
        for (const [key, selected] of Object.entries(files)) for (const file of selected) data.append(key, file);
        const response = await fetch(DOCUMENT_API + '/process/' + encodeURIComponent(tool.id), { method: 'POST', body: data, signal: controller.current.signal });
        if (!response.ok) { const data = await response.json().catch(() => ({})); throw new Error(data.error || 'The file could not be processed.'); }
        blob = await response.blob();
        const header = response.headers.get('Content-Disposition') || '';
        name = header.match(/filename="?([^";]+)/)?.[1] || 'converted-document';
      }
      if (current !== serial.current) return;
      if (resultRef.current) URL.revokeObjectURL(resultRef.current);
      const url = URL.createObjectURL(blob); resultRef.current = url;
      setResult({ blob, url, name });
    } catch (error) {
      if (current === serial.current) setError(error instanceof Error && error.name !== 'AbortError' ? error.message : 'Processing was cancelled or exceeded the time limit.');
    } finally { clearTimeout(timeout); if (current === serial.current) setBusy(false); }
  };
  if (tool.mode === 'workspace') return <section className="ds-workbench ds-editor-callout">
    <span className="ds-badge">ON YOUR DEVICE</span><h2>The complete PDF workspace</h2>
    <p>Read and search PDFs, annotate pages, organize documents, work with forms and recognize text in scans. Your document stays in the browser.</p>
    <div className="ds-feature-list"><span>Annotations &amp; comments</span><span>Forms &amp; page tools</span><span>Local OCR</span><span>Download your edits</span></div>
    <Link className="btn btn-primary" href={PDF_EDITOR_URL} prefetch={false}>Open full PDF editor ↗</Link>
    <p className="ds-note">{tool.note} Large scans work best on a desktop.</p>
  </section>;
  return <section className="ds-workbench" aria-labelledby="document-operation-heading">
    <div className="ds-workbench-heading"><div><span className={'ds-badge' + (!isLocal ? ' ds-server' : '')}>{isLocal ? 'ON YOUR DEVICE' : 'SERVER PROCESSING'}</span><h2 id="document-operation-heading">{tool.name}</h2></div><span className="ds-engine">{tool.engine}</span></div>
    <p>{tool.description}</p>
    {!isLocal && <p className="ds-processing-note">Files are uploaded only when you choose “Upload &amp; process”. Temporary conversion files are deleted after the response. <Link href="/privacy">Privacy details</Link>.</p>}
    {!isLocal && !available && <p className="availability-note" role="status">{unavailableReason || (!DOCUMENT_API ? 'This server tool is not available on this deployment yet. Local tools and the PDF editor are ready to use.' : remoteReady === undefined ? 'Checking processing service…' : 'This processing service is unavailable right now.')} <Link href="/pdf">Browse local PDF tools</Link>.</p>}
    <div className="ds-operation-grid"><div>
      {uploads.map(slot => <div className="ds-upload-slot" key={slot.key}>
        {uploads.length > 1 && <h3>{slot.label}</h3>}
        <FileDrop accept={slot.accept === '*' ? '' : slot.accept} multiple={slot.multiple} label={slot.label} onFiles={selected => { if (!busy) choose(slot.key, selected, slot.accept, slot.multiple); }} />
        {!!files[slot.key]?.length && <ul className="ds-files">{files[slot.key].map((file, i) => <li key={file.name + i}><span>{file.name}<small>{formatBytes(file.size)}</small></span><button type="button" aria-label={'Remove ' + file.name} disabled={busy} onClick={() => { setFiles(previous => ({ ...previous, [slot.key]: previous[slot.key].filter((_, index) => index !== i) })); setResult(null); }}>×</button></li>)}</ul>}
      </div>)}
      <div className="ds-fields">{tool.fields.map(field => <label key={field.key} className={field.kind === 'textarea' ? 'ds-field ds-wide' : 'ds-field'}>
        <span>{field.label}{field.required ? ' *' : ''}</span>
        {field.kind === 'select' ? <select disabled={busy} value={String(options[field.key])} onChange={e => setOptions(previous => ({ ...previous, [field.key]: e.target.value }))}>{field.options?.map(value => <option key={value} value={value}>{value}</option>)}</select>
          : field.kind === 'textarea' ? <textarea disabled={busy} rows={5} value={String(options[field.key])} onChange={e => setOptions(previous => ({ ...previous, [field.key]: e.target.value }))} />
          : <input disabled={busy} type={field.kind === 'checkbox' ? 'checkbox' : field.kind === 'password' ? 'password' : field.kind === 'number' ? 'number' : 'text'}
            {...(field.kind === 'checkbox' ? { checked: !!options[field.key] } : { value: String(options[field.key] ?? '') })}
            min={field.min} max={field.max} autoComplete={field.kind === 'password' ? 'off' : undefined} required={field.required} placeholder={field.placeholder}
            onChange={e => setOptions(previous => ({ ...previous, [field.key]: field.kind === 'checkbox' ? e.target.checked : e.target.value }))} />}
      </label>)}</div>
      <div className="btn-row"><button type="button" className="btn btn-primary" disabled={busy || !available || !chosen.length} onClick={process}>{busy ? 'Processing…' : isLocal ? 'Process on my device' : 'Upload & process'}</button>{busy && !isLocal && <button type="button" className="btn" onClick={() => controller.current?.abort()}>Cancel</button>}</div>
      {busy && <p role="status">{isLocal ? 'Working locally. Large files may take a moment.' : 'Waiting for the processing engine. You can cancel this request.'}</p>}
      {error && <p className="ds-error" role="alert">{error}</p>}
      {result && <div className="ds-result" role="status"><strong>Your file is ready</strong><p>{result.name} · {formatBytes(result.blob.size)}</p><a className="btn btn-primary" href={result.url} download={result.name}>Download result ↓</a></div>}
    </div><aside><PdfThumbnail file={result?.blob.type === 'application/pdf' ? result.blob : chosen[0]?.name.toLowerCase().endsWith('.pdf') ? chosen[0] : undefined} /><p className="ds-note">{tool.note || 'Keep the original and review the downloaded result before sharing.'}</p></aside></div>
  </section>;
}
