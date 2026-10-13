import { questions, certs } from '../data/podcast';
import { challenges } from '../data/ctf';
import { DX, AC } from '../data/kit';

function Card({ href, kicker, title, pct }) {
  return (
    <li><a href={href}><span className="pc-k">{kicker}</span><b>{title}</b>
      <span className="pc-bar"><i style={{ width: Math.max(0, Math.min(100, pct)) + '%' }} /></span></a></li>
  );
}

export default function Home({ podcast, ctf, kit }) {
  const nCerts = Object.values(podcast.earned || {}).filter(Boolean).length;
  const ctfPct = Math.round((ctf.solved.length / challenges.length) * 100);
  const yes = kit.dx.filter((v) => v === 1).length, acN = kit.ac.filter(Boolean).length;
  const kitPct = Math.round(((yes + acN) / (DX.length + AC.length)) * 100);
  const [podTxt, podPct] = podcast.score !== null ? [`Cuestionario ${podcast.score}/${questions.length}`, 100]
    : podcast.listened ? ['Escuchado, falta el cuestionario', 70] : ['Sin escuchar', 0];

  return (
    <section id="inicio" className="view on hero">
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow">Escucha · Practica · Protege</p>
          <h1>Ciberseguridad que sí se entiende</h1>
          <p className="lead">Un podcast sobre cómo usan tus redes en tu contra, un juego de retos para entrenar tu ojo y un kit paso a paso para proteger tu negocio.</p>
          <div className="cta">
            <a className="btn btn-primary" href="#podcast">Escuchar el podcast</a>
            <a className="btn btn-ghost" href="#ctf">Jugar los retos</a>
            <a className="btn btn-ghost" href="#kit">Ver el kit</a>
          </div>
        </div>
        <ul className="progress-cards" aria-label="Tu progreso">
          <Card href="#podcast" kicker="1 · Podcast" title={podTxt} pct={podPct} />
          <Card href="#ctf" kicker="2 · Reto CTF" title={`${ctf.solved.length} / ${challenges.length} banderas`} pct={ctfPct} />
          <Card href="#kit" kicker="3 · Kit de protección" title={`${kitPct}% protegido`} pct={kitPct} />
          <Card href="#pCerts" kicker="Microcertificaciones" title={`${nCerts} / ${certs.length} obtenidas`} pct={(nCerts / certs.length) * 100} />
        </ul>
      </div>
    </section>
  );
}
