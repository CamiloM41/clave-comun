import { useEffect, useState } from 'react';

export const VIEWS = ['inicio', 'podcast', 'ctf', 'kit'];
// Anclas internas -> vista que las contiene (el resto de anclas se resuelve en el DOM).
const ANCHORS = {
  pCerts: 'podcast',
  diagnostico: 'kit', acciones: 'kit', plan: 'kit', estafas: 'kit', hackeo: 'kit'
};
const viewOf = (h) => VIEWS.includes(h) ? h : ANCHORS[h] || (/^(ac|dia)-\d+$/.test(h) ? 'kit' : 'inicio');

function parse() {
  const h = decodeURIComponent(location.hash.slice(1));
  return { view: viewOf(h), target: VIEWS.includes(h) ? null : h || null };
}

// Rutas por hash: #inicio, #podcast, #ctf, #kit. Otras anclas (#ac-2, #estafas…) abren su vista y se desplazan hasta ellas.
export function useRoute() {
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const on = () => setRoute(parse());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);

  useEffect(() => {
    const el = route.target && document.getElementById(route.target);
    if (el) {
      el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
      requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [route]);

  return route;
}
