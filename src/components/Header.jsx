import { useShare } from '../lib/ui';

const LINKS = [['inicio', 'Inicio'], ['podcast', 'Podcast'], ['ctf', 'Reto CTF'], ['kit', 'Kit']];

export default function Header({ view }) {
  const openShare = useShare();
  return (
    <header className="top">
      <a className="brand" href="#inicio" aria-label="Clave C*mún, inicio">
        <span className="mark" aria-hidden="true">*</span><span className="word">Clave C*mún</span>
      </a>
      <nav aria-label="Secciones">
        {LINKS.map(([id, label]) => (
          <a key={id} href={'#' + id} aria-current={view === id ? 'page' : undefined}>{label}</a>
        ))}
      </nav>
      <button className="btn btn-share" type="button"
        onClick={() => openShare({ title: 'Clave C*mún', text: 'Clave C*mún: podcast, retos CTF y un kit de ciberseguridad para emprendedores.' })}>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M18 8a3 3 0 1 0-2.8-4M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm12 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.6 10.5l6.8-4M8.6 13.5l6.8 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Compartir
      </button>
    </header>
  );
}
