'use client';
import Link from 'next/link';
import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { commitHistory, newHistory, type EditorHistory } from '@/lib/pdf-editor/history';
import type { Box, Point } from '@/lib/pdf-editor/geometry';
import type { EditorPage, TextRegion, EditorAction } from '@/lib/pdf-editor/engine';
import type { EditorField } from '@/lib/pdf-editor/documents';
type Mode = 'edit' | 'text' | 'highlight' | 'rectangle' | 'image';
type Draft = { key: number; region?: TextRegion; x: number; y: number; text: string; size: number; color: string; font: 'inter' | 'source' };
const MODES: { key: Mode; label: string; glyph: string }[] = [
  { key: 'edit', label: 'Edit text', glyph: 'I' }, { key: 'text', label: 'Add text', glyph: 'T' },
  { key: 'highlight', label: 'Highlight', glyph: '▰' }, { key: 'rectangle', label: 'Rectangle', glyph: '□' }, { key: 'image', label: 'Image / signature', glyph: '▧' },
];
export default function PdfEditor({ embedded = false }: { embedded?: boolean }) {
  const Heading = embedded ? 'h2' : 'h1';
  const [history, setHistory] = useState<EditorHistory>();
  const [name, setName] = useState('document.pdf'), [page, setPage] = useState(0), [view, setView] = useState<EditorPage>();
  const [mode, setMode] = useState<Mode>('edit'), [draft, setDraft] = useState<Draft>();
  const [zoom, setZoom] = useState(1), [stageWidth, setStageWidth] = useState(800);
  const [busy, setBusy] = useState(false), [loading, setLoading] = useState(false), [error, setError] = useState('');
  const [status, setStatus] = useState('Choose a PDF to start. Your file stays on this device.');
  const [color, setColor] = useState('#facc15'), [drag, setDrag] = useState<{ start: Point; box: Box }>();
  const [image, setImage] = useState<{ bytes: Uint8Array; kind: 'png' | 'jpg'; width: number; height: number; name: string }>();
  const [forms, setForms] = useState<EditorField[]>(), [formValues, setFormValues] = useState<Record<string, string | boolean>>({});
  const [download, setDownload] = useState('');
  const canvas = useRef<HTMLCanvasElement>(null), stage = useRef<HTMLDivElement>(null), textarea = useRef<HTMLTextAreaElement>(null);
  const serial = useRef(0), actionLock = useRef(false);
  const bytes = history?.versions[history.cursor];
  const fit = view ? Math.min(1, Math.max(180, stageWidth - 40) / view.width) : 1;
  const ratio = fit * zoom;
  const pending = busy || loading;
  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const observer = new ResizeObserver(entries => setStageWidth(entries[0].contentRect.width));
    observer.observe(element); return () => observer.disconnect();
  }, [!!history]);
  useEffect(() => {
    if (!bytes) return;
    const id = ++serial.current;
    setLoading(true); setView(undefined); setError('');
    import('@/lib/pdf-editor/engine').then(engine => engine.inspectEditorPage(bytes, page)).then(result => {
      if (id === serial.current) setView(result);
    }).catch(error => { if (id === serial.current) setError(error instanceof Error ? error.message : 'The page could not open.'); })
      .finally(() => { if (id === serial.current) setLoading(false); });
    return () => { serial.current++; };
  }, [bytes, page]);
  useEffect(() => {
    if (!view || !canvas.current) return;
    const element = canvas.current;
    element.width = view.pixelWidth; element.height = view.pixelHeight;
    element.getContext('2d')?.putImageData(new ImageData(new Uint8ClampedArray(view.pixels), view.pixelWidth, view.pixelHeight), 0, 0);
  }, [view]);
  useEffect(() => {
    if (!bytes) return;
    const url = URL.createObjectURL(new Blob([new Uint8Array(bytes)], { type: 'application/pdf' }));
    setDownload(url); return () => URL.revokeObjectURL(url);
  }, [bytes]);
  useEffect(() => { if (draft) { textarea.current?.focus(); textarea.current?.select(); } }, [draft?.key]);
  const clearSelection = () => { setDraft(undefined); setForms(undefined); setDrag(undefined); };
  const undo = () => {
    if (pending) return;
    if (draft) { setDraft(undefined); setStatus('Unapplied text cancelled.'); return; }
    setHistory(previous => previous && ({ ...previous, cursor: Math.max(0, previous.cursor - 1) }));
    setPage(0); clearSelection(); setStatus('Undid the last saved edit.');
  };
  const redo = () => {
    if (pending || !history) return;
    setHistory({ ...history, cursor: Math.min(history.versions.length - 1, history.cursor + 1) });
    setPage(0); clearSelection(); setStatus('Restored the next saved edit.');
  };
  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement)?.closest('input, textarea, select, [contenteditable=true]')) return;
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') { event.preventDefault(); event.shiftKey ? redo() : undo(); }
      if (event.key === 'Escape') clearSelection();
    };
    window.addEventListener('keydown', keydown); return () => window.removeEventListener('keydown', keydown);
  });
  const open = async (file?: File) => {
    if (!file || pending || actionLock.current) return;
    setError(''); setStatus('Opening your PDF…'); setBusy(true);
    try {
      if (!file.name.toLowerCase().endsWith('.pdf') || !file.size || file.size > 20 * 1024 * 1024) throw new Error('Choose a nonempty PDF smaller than 20 MB.');
      const next = new Uint8Array(await file.arrayBuffer());
      const engine = await import('@/lib/pdf-editor/engine');
      // Validate before replacing an existing editing session.
      await engine.inspectEditorPage(next, 0, .25);
      setName(file.name); clearSelection(); setHistory(newHistory(next)); setPage(0); setZoom(1); setMode('edit'); setImage(undefined);
      setStatus('PDF ready. Click a text box to edit it, or choose Add text and click the page.');
    } catch (error) { setError(error instanceof Error ? error.message : 'The PDF could not open.'); }
    finally { setBusy(false); }
  };
  const saveAction = async (action: EditorAction) => {
    if (!bytes || pending || actionLock.current) return;
    actionLock.current = true; setBusy(true); setError('');
    try {
      const { applyEditorAction } = await import('@/lib/pdf-editor/engine');
      const next = await applyEditorAction(bytes, page, action);
      setHistory(previous => previous ? commitHistory(previous, next) : newHistory(next));
      if (action.kind === 'delete-page') setPage(Math.max(0, page - 1));
      clearSelection();
      setStatus(action.kind === 'text' ? 'Text saved in the PDF. Download your edited copy when ready.' : 'Edit applied. Undo is available.');
    } catch (error) { setError(error instanceof Error ? error.message : 'The edit could not be saved. Your previous version is unchanged.'); }
    finally { actionLock.current = false; setBusy(false); }
  };
  const begin = (region: TextRegion) => {
    if (pending) return;
    if (draft && draft.text !== (draft.region?.text || '')) { setError('Apply or cancel your current text before selecting another box.'); return; }
    setError(''); setForms(undefined);
    setDraft({ key: Date.now(), region, x: region.box.x, y: region.box.y, text: region.text, size: region.size, color: region.color, font: 'inter' });
    setStatus('Type your replacement, then choose Apply text. Other PDF objects are kept.');
  };
  const point = (event: PointerEvent<HTMLDivElement>): Point => {
    const bounds = event.currentTarget.getBoundingClientRect();
    return { x: Math.min(view?.width || 0, Math.max(0, (event.clientX - bounds.left) / ratio)), y: Math.min(view?.height || 0, Math.max(0, (event.clientY - bounds.top) / ratio)) };
  };
  const pointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!view || pending || !['highlight', 'rectangle'].includes(mode)) return;
    event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId);
    const start = point(event); setDrag({ start, box: { ...start, width: 0, height: 0 } });
  };
  const pointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag) return;
    const end = point(event);
    setDrag({ start: drag.start, box: { x: Math.min(end.x, drag.start.x), y: Math.min(end.y, drag.start.y), width: Math.abs(end.x - drag.start.x), height: Math.abs(end.y - drag.start.y) } });
  };
  const pointerUp = async (event: PointerEvent<HTMLDivElement>) => {
    if (!view || !bytes || pending) return;
    if (drag) { const box = drag.box; setDrag(undefined); if (box.width >= 2 && box.height >= 2) await saveAction({ kind: mode as 'highlight' | 'rectangle', box, color }); return; }
    if (mode === 'text') {
      if (draft?.text.trim()) { setError('Apply or cancel the current text first.'); return; }
      const position = point(event); setForms(undefined); setDraft({ key: Date.now(), ...position, text: '', size: 16, color: '#17202e', font: 'inter' });
      setStatus('Position selected. Type your text in the panel, then choose Apply text.');
    } else if (mode === 'image' && image) {
      actionLock.current = true; setBusy(true); setError('');
      try {
        const position = point(event);
        const width = Math.min(180, view.width - position.x - 4, (view.height - position.y - 4) * image.width / image.height);
        if (width < 8) throw new Error('Click farther from the page edge to place this image.');
        const { insertEditorImage } = await import('@/lib/pdf-editor/documents');
        const next = await insertEditorImage(bytes, page, image.bytes, image.kind, view.view, position.x, position.y, width, width * image.height / image.width);
        setHistory(previous => previous && commitHistory(previous, next)); setStatus('Image added to the PDF. Undo is available.');
      } catch (error) { setError(error instanceof Error ? error.message : 'The image could not be added.'); }
      finally { actionLock.current = false; setBusy(false); }
    }
  };
  const chooseImage = async (file?: File) => {
    if (!file) return;
    try {
      if (!/\.(png|jpe?g)$/i.test(file.name) || file.size > 8 * 1024 * 1024) throw new Error('Choose a PNG or JPG smaller than 8 MB.');
      const bitmap = await createImageBitmap(file);
      const width = bitmap.width, height = bitmap.height; bitmap.close();
      if (width * height > 16000000) throw new Error('Choose an image smaller than 16 megapixels.');
      setImage({ bytes: new Uint8Array(await file.arrayBuffer()), kind: /\.png$/i.test(file.name) ? 'png' : 'jpg', width, height, name: file.name });
      setError(''); setStatus('Image ready. Click the page to place it.');
    } catch (error) { setError(error instanceof Error ? error.message : 'That image could not open.'); }
  };
  const showForms = async () => {
    if (!bytes || pending) return;
    setBusy(true); setError(''); setDraft(undefined);
    try {
      const { readEditorFields } = await import('@/lib/pdf-editor/documents');
      const fields = await readEditorFields(bytes); setForms(fields); setFormValues(Object.fromEntries(fields.map(field => [field.name, field.value])));
      setStatus(fields.length ? 'Complete the fields, then choose Save form values.' : 'No supported fillable fields found. Use Add text for a flat form.');
    } catch (error) { setError(error instanceof Error ? error.message : 'The form fields could not be read.'); }
    finally { setBusy(false); }
  };
  const saveForms = async () => {
    if (!bytes || pending || actionLock.current) return;
    setBusy(true); setError(''); actionLock.current = true;
    try {
      const { updateEditorFields } = await import('@/lib/pdf-editor/documents');
      const next = await updateEditorFields(bytes, formValues); setHistory(previous => previous && commitHistory(previous, next)); setForms(undefined); setStatus('Form values saved in the PDF.');
    } catch (error) { setError(error instanceof Error ? error.message : 'The form could not be saved.'); }
    finally { setBusy(false); actionLock.current = false; }
  };
  return <section className={'pe-editor' + (embedded ? ' pe-embedded' : '')} aria-label="All Tools Together PDF editor">
    <header className="pe-heading"><div><Link href="/document-studio" className="pe-back">Document Studio</Link><Heading>PDF editor<span className="pe-local">Local editing · no upload</span></Heading><p>Edit your document, keep the original.</p></div>
      <div className="pe-file-actions"><label className="pe-open">Open PDF<input type="file" accept=".pdf,application/pdf" disabled={pending} onChange={event => { void open(event.target.files?.[0]); event.target.value = ''; }} /></label>{download && <a className={'pe-download' + (draft ? ' pe-download-draft' : '')} aria-disabled={pending} onClick={event => { if (pending) event.preventDefault(); }} href={download} download={name.replace(/\.pdf$/i, '') + '-edited.pdf'}>Download PDF</a>}</div>
    </header>
    {!history ? <div className="pe-empty"><div className="pe-empty-symbol" aria-hidden="true">Aa</div><h2>Make the changes you need.</h2><p>Replace editable text, add notes or a signature image, highlight sections and organize pages. Work happens in your browser.</p><label className="pe-open pe-open-large">Choose your PDF<input type="file" accept=".pdf,application/pdf" disabled={pending} onChange={event => { void open(event.target.files?.[0]); event.target.value = ''; }} /></label><p className="pe-secondary">PDF · up to 20 MB · up to 200 pages</p><div className="pe-empty-features"><span>Click-to-edit text</span><span>Undo &amp; redo</span><span>Fillable forms</span><span>Original PDF preserved</span></div></div> : <>
      <div className="pe-toolbar" role="group" aria-label="PDF editing tools">{MODES.map(tool => <button key={tool.key} type="button" aria-pressed={mode === tool.key} disabled={pending || !view} onClick={() => { if (draft?.text !== draft?.region?.text && draft?.text) { setError('Apply or cancel the current text first.'); return; } clearSelection(); setMode(tool.key); setStatus(tool.key === 'edit' ? 'Click a blue text box to edit it.' : tool.key === 'text' ? 'Click a position on the page to add text.' : tool.key === 'image' ? 'Choose an image, then click the page.' : 'Drag on the page to mark an area.'); }}><span aria-hidden="true">{tool.glyph}</span>{tool.label}</button>)}
        <button type="button" disabled={pending || !view} onClick={() => void showForms()}>Fill forms</button><span className="pe-tool-separator" /><button type="button" disabled={pending || !draft && history.cursor === 0} onClick={undo}>Undo</button><button type="button" disabled={pending || history.cursor >= history.versions.length - 1} onClick={redo}>Redo</button></div>
      <div className="pe-document-bar"><span className="pe-filename" title={name}>{name}</span><div><button type="button" aria-label="Previous page" disabled={pending || page === 0} onClick={() => { clearSelection(); setPage(page - 1); }}>‹</button><span>Page {page + 1} of {view?.count || '…'}</span><button type="button" aria-label="Next page" disabled={pending || !view || page >= view.count - 1} onClick={() => { clearSelection(); setPage(page + 1); }}>›</button><label>Zoom<select value={zoom} onChange={event => setZoom(Number(event.target.value))}><option value={.75}>75%</option><option value={1}>Fit</option><option value={1.25}>125%</option><option value={1.5}>150%</option><option value={2}>200%</option></select></label></div></div>
      <div className="pe-workspace"><div className="pe-canvas-scroll" ref={stage} aria-busy={pending}>{loading && <p className="pe-page-loading" role="status">Rendering page…</p>}{view && <div className={'pe-page pe-mode-' + mode} data-testid="editor-page" style={{ width: view.width * ratio, height: view.height * ratio }} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={event => void pointerUp(event)} onPointerCancel={() => setDrag(undefined)}>
        <canvas ref={canvas} aria-label={'PDF preview, page ' + (page + 1)} />
        {mode === 'edit' && view.regions.map(region => <button type="button" key={region.index} aria-label={'Edit text: ' + region.text.slice(0,100)} title={region.text} className={'pe-text-hit' + (draft?.region?.index === region.index ? ' pe-text-selected' : '')} style={{ left: region.box.x * ratio, top: region.box.y * ratio, width: Math.max(8, region.box.width * ratio), height: Math.max(12, region.box.height * ratio) }} disabled={pending} onPointerUp={event => event.stopPropagation()} onClick={event => { event.stopPropagation(); begin(region); }} />)}
        {draft && !draft.region && <span className="pe-placement" style={{ left: draft.x * ratio, top: draft.y * ratio }} aria-hidden="true" />}
        {drag && <span className="pe-drag-box" style={{ left: drag.box.x * ratio, top: drag.box.y * ratio, width: drag.box.width * ratio, height: drag.box.height * ratio }} />}
      </div>}</div>
      <aside className="pe-inspector" aria-label="Edit settings">
        {draft ? <><span className="pe-panel-label">{draft.region ? 'REPLACE EXISTING TEXT' : 'NEW TEXT'}</span><h2>Your text</h2><label><span>Text content</span><textarea aria-label="Text content" ref={textarea} rows={5} maxLength={2000} value={draft.text} disabled={busy} onChange={event => setDraft({ ...draft, text: event.target.value })} /></label><div className="pe-setting-row"><label>Font size<input aria-label="Font size" type="number" min={.1} max={1000} step={.1} value={draft.size} disabled={busy} onChange={event => setDraft({ ...draft, size: Number(event.target.value) })} /></label><label>Text color<input aria-label="Text color" type="color" value={draft.color} disabled={busy} onChange={event => setDraft({ ...draft, color: event.target.value })} /></label></div><label>Replacement font<select aria-label="Replacement font" value={draft.font} disabled={busy} onChange={event => setDraft({ ...draft, font: event.target.value as Draft['font'] })}><option value="inter">Inter · embedded in PDF</option>{draft.region && <option value="source">Source font · existing characters</option>}</select></label><p className="pe-secondary">Inter supports new characters without relying on a font installed on the reader&apos;s device. Exact source-font spacing can change.</p><button className="pe-primary" type="button" disabled={pending || !draft.text.trim()} onClick={() => void saveAction({ kind: 'text', change: { index: draft.region?.index, original: draft.region?.text, text: draft.text, size: draft.size, color: draft.color, font: draft.font, x: draft.x, y: draft.y } })}>Apply text</button><button type="button" disabled={busy} onClick={() => { setDraft(undefined); setError(''); }}>Cancel text</button>{draft.region && <button type="button" className="pe-danger" disabled={pending} onClick={() => void saveAction({ kind: 'remove-text', index: draft.region!.index, original: draft.region!.text })}>Delete selected text</button>}</>
        : forms ? <><span className="pe-panel-label">FILLABLE PDF</span><h2>Form fields</h2>{forms.map(field => <label key={field.name}>{field.name}{field.readonly && <span> · read-only</span>}{field.kind === 'checkbox' ? <input type="checkbox" checked={!!formValues[field.name]} disabled={pending || field.readonly} onChange={event => setFormValues({ ...formValues, [field.name]: event.target.checked })} /> : field.kind === 'select' ? <select value={String(formValues[field.name])} disabled={pending || field.readonly} onChange={event => setFormValues({ ...formValues, [field.name]: event.target.value })}><option value="">Choose…</option>{field.options?.map(value => <option key={value}>{value}</option>)}</select> : <input type="text" value={String(formValues[field.name])} disabled={pending || field.readonly} onChange={event => setFormValues({ ...formValues, [field.name]: event.target.value })} />}</label>)}{forms.length ? <button type="button" className="pe-primary" disabled={pending} onClick={() => void saveForms()}>Save form values</button> : <p>No standard fillable fields on this document. Use Add text for a flat form.</p>}<button type="button" onClick={() => setForms(undefined)}>Close fields</button></>
        : <><span className="pe-panel-label">MAKE IT YOURS</span><h2>{MODES.find(tool => tool.key === mode)?.label}</h2><p>{mode === 'edit' ? 'Click a blue outline on the page. Your text will open here for typing.' : mode === 'text' ? 'Click anywhere on the page to choose a position, then type and apply your text.' : mode === 'image' ? 'Add a PNG or JPG, including a signature you already have, then click the page to place it.' : 'Drag across the page to choose the area to mark.'}</p>
          {mode === 'image' && <><label className="pe-image-upload">Choose PNG or JPG<input type="file" accept="image/png,image/jpeg" disabled={pending} onChange={event => void chooseImage(event.target.files?.[0])} /></label>{image && <p className="pe-secondary">{image.name} is ready to place.</p>}<p className="pe-secondary">A signature image is a visual mark, not a cryptographic digital signature.</p></>}
          {['highlight','rectangle'].includes(mode) && <label>Mark color<input type="color" value={color} onChange={event => setColor(event.target.value)} /></label>}
          {mode === 'edit' && view && !view.regions.length && <p className="pe-explanation">No directly editable text on this page. It may be a scan, outlined lettering or grouped artwork. Add text remains available. OCR can recover words from scans, but does not turn the picture into editable original text.</p>}
          {mode === 'edit' && view?.grouped && <p className="pe-secondary">Grouped artwork stays intact. Text inside a group may not have an edit outline.</p>}
          <div className="pe-page-actions"><h3>This page</h3><button type="button" disabled={pending || !view} onClick={() => void saveAction({ kind: 'rotate' })}>Rotate 90°</button><button type="button" className="pe-danger" disabled={pending || !view || view.count < 2} onClick={() => void saveAction({ kind: 'delete-page' })}>Delete page</button></div>
          <p className="pe-secondary">Highlights and drawings are not secure redaction. Editing can invalidate existing digital signatures.</p></>}
      </aside></div>
      {draft && <p className="pe-draft-note">Text is not in the saved PDF until you choose Apply text. Download includes only applied edits.</p>}
    </>}
    <div className="pe-status" role="status">{pending ? busy ? 'Applying your change…' : 'Rendering your document…' : status}</div>
    {error && <p className="pe-error" role="alert">{error}</p>}
    <footer className="pe-footer"><p>Built by All Tools Together. Files stay in this browser; downloads keep the original file unchanged.</p><nav><Link href="/pdf">More PDF tools</Link><Link href="/pdf/ocr-pdf">OCR for scans</Link><Link href="/open-source">Engine sources &amp; licenses</Link></nav></footer>
  </section>;
}
