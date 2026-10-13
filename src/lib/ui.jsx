import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { SITE_URL } from './config';

/* ---------- Avisos (toast) ---------- */
const ToastCtx = createContext(() => {});
export const useToast = () => useContext(ToastCtx);

/* ---------- Compartir ---------- */
const ShareCtx = createContext(() => {});
export const useShare = () => useContext(ShareCtx);

export function shareUrl(hash) {
  const base = (SITE_URL || location.href.split('#')[0]).replace(/#.*$/, '');
  return base + (hash ? '#' + hash : '');
}

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch { /* sigue */ }
  const ta = document.createElement('textarea');
  ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
  document.body.appendChild(ta); ta.select(); ta.setSelectionRange(0, text.length);
  let ok = false; try { ok = document.execCommand('copy'); } catch { /* nada */ }
  ta.remove(); return ok;
}

function ShareDialog({ data, onClose }) {
  const ref = useRef(null);
  const [copyLabel, setCopyLabel] = useState(null);
  const text = useRef(null);

  useEffect(() => {
    const d = ref.current;
    if (data && !d.open) d.showModal();
    if (!data && d.open) d.close();
  }, [data]);

  const title = data?.title || '';
  const full = data ? `${data.text}\n${shareUrl(data.hash)}` : '';
  const url = data ? shareUrl(data.hash) : '';
  const enc = encodeURIComponent;
  const isFile = typeof location !== 'undefined' && location.protocol === 'file:';

  const copy = async () => {
    const ok = await copyText(full);
    if (!ok) text.current?.select();
    setCopyLabel(ok ? '✓ Copiado. ¡Ya puedes pegarlo!' : 'Selecciona el texto y copia con Ctrl+C');
    setTimeout(() => setCopyLabel(null), 2500);
  };
  const native = async () => {
    try { await navigator.share({ title, text: data.text, url }); onClose(); } catch { /* cancelado */ }
  };

  return (
    <dialog ref={ref} className="modal share" aria-labelledby="shTitle" onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}>
      <div className="m-head">
        <div><span className="m-meta">Compartir</span><h2 id="shTitle">{title}</h2></div>
        <button className="btn btn-ghost small" type="button" onClick={onClose} aria-label="Cerrar">✕</button>
      </div>
      <div className="m-body">
        <label htmlFor="shText" style={{ fontWeight: 700 }}>Mensaje</label>
        <textarea id="shText" ref={text} rows={4} readOnly value={full} />
        <div className="sh-btns">
          <a className="btn btn-primary" target="_blank" rel="noopener noreferrer" href={'https://wa.me/?text=' + enc(full)}>WhatsApp</a>
          <a className="btn btn-ghost" href={`mailto:?subject=${enc(title)}&body=${enc(full)}`}>Correo</a>
          <a className="btn btn-ghost" target="_blank" rel="noopener noreferrer" href={'https://www.linkedin.com/sharing/share-offsite/?url=' + enc(url)}>LinkedIn</a>
          <a className="btn btn-ghost" target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?text=${enc(data?.text || '')}&url=${enc(url)}`}>X</a>
          <button className="btn btn-ghost" type="button" onClick={copy}>{copyLabel || 'Copiar mensaje y enlace'}</button>
          {typeof navigator !== 'undefined' && navigator.share && <button className="btn btn-ghost" type="button" onClick={native}>Más opciones…</button>}
        </div>
        {isFile && !SITE_URL && (
          <p className="fine">Estás viendo el sitio desde un archivo local, así que el enlace solo funciona en este computador. Publica el sitio (carpeta <code>dist</code>) en un hosting y define la dirección en <code>SITE_URL</code> dentro de <code>src/lib/config.js</code>.</p>
        )}
      </div>
    </dialog>
  );
}

export function UiProvider({ children }) {
  const [toastMsg, setToastMsg] = useState('');
  const [on, setOn] = useState(false);
  const [share, setShare] = useState(null);
  const timer = useRef();

  const toast = useCallback((msg) => {
    setToastMsg(msg); setOn(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOn(false), 2600);
  }, []);
  const openShare = useCallback((data) => setShare(data), []);

  return (
    <ToastCtx.Provider value={toast}>
      <ShareCtx.Provider value={openShare}>
        {children}
        <ShareDialog data={share} onClose={() => setShare(null)} />
        <div className={'toast' + (on ? ' on' : '')} role="status" aria-live="polite">{toastMsg}</div>
      </ShareCtx.Provider>
    </ToastCtx.Provider>
  );
}
