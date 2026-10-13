import { useEffect } from 'react';
import { useLocalStorage } from './lib/storage';
import { UiProvider } from './lib/ui';
import { useRoute } from './lib/useRoute';
import Header from './components/Header';
import Home from './pages/Home';
import Podcast from './pages/Podcast';
import Ctf from './pages/Ctf';
import Kit from './pages/Kit';
import { DX, AC, PL } from './data/kit';

const NAMES = { inicio: 'Ciberseguridad para todos', podcast: 'Podcast', ctf: 'Reto CTF', kit: 'Kit de protección' };

export default function App() {
  // El estado de cada proyecto vive aquí para que el inicio muestre el progreso de todos.
  const podcast = useLocalStorage('cyberlab-podcast-v1', { listened: false, score: null, earned: {}, name: '' });
  const ctf = useLocalStorage('cyberlab-ctf-v1', { solved: [], hints: [], score: 0, streak: 0 });
  const kit = useLocalStorage('sp-ciber-v1', {
    dx: Array(DX.length).fill(null), ac: Array(AC.length).fill(false), pl: Array(PL.length).fill(false)
  });
  const { view } = useRoute();

  useEffect(() => {
    document.title = view === 'inicio' ? `Clave C*mún · ${NAMES.inicio}` : `${NAMES[view]} · Clave C*mún`;
  }, [view]);

  return (
    <UiProvider>
      <a className="skip" href="#contenido">Saltar al contenido</a>
      <Header view={view} />
      <main id="contenido">
        {view === 'inicio' && <Home podcast={podcast[0]} ctf={ctf[0]} kit={kit[0]} />}
        {view === 'podcast' && <Podcast state={podcast} />}
        {view === 'ctf' && <Ctf state={ctf} />}
        {view === 'kit' && <Kit state={kit} />}
      </main>
      <footer className="foot">
        <div className="wrap">
          <p>Guía defensiva y orientativa. Haz simulacros de seguridad solo sobre tu propio negocio o con autorización escrita; en Colombia, el acceso abusivo a sistemas está penalizado por la Ley 1273 de 2009. No reemplaza asesoría legal ni técnica. Tu progreso se guarda solo en este navegador.</p>
        </div>
      </footer>
    </UiProvider>
  );
}
