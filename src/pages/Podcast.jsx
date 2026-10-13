import { useEffect, useRef, useState } from 'react';
import { events, questions, tiers, certs } from '../data/podcast';
import { useToast } from '../lib/ui';
import { downloadCert } from '../lib/certificate';
import ShareButton from '../components/ShareButton';

const fmt = (s) => { s = Math.max(0, s || 0); const m = Math.floor(s / 60), r = Math.floor(s % 60); return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`; };

export default function Podcast({ state: [state, setState] }) {
  const toast = useToast();
  const audio = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);
  const [seeking, setSeeking] = useState(null);
  const [phase, setPhase] = useState('idle'); // idle | quiz | result
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const quizRef = useRef(null), resultRef = useRef(null);

  const idx = events.findLastIndex((e) => cur >= e.time);
  const concept = idx === -1
    ? { title: 'Listo para empezar', detail: 'Reproduce el audio para ver cómo los atacantes recopilan e interconectan datos públicos.' }
    : events[idx];

  useEffect(() => {
    if (phase === 'quiz') quizRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (phase === 'result') resultRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [phase]);

  const togglePlay = () => {
    const a = audio.current;
    if (a.paused) a.play().catch(() => toast('No se pudo reproducir el audio.')); else a.pause();
  };
  const openQuiz = () => {
    setState((s) => ({ ...s, listened: true }));
    setAnswers({}); setPhase('quiz');
  };

  const submit = () => {
    const missing = questions.filter((_, i) => answers[i] === undefined).length;
    if (missing) { toast(`Te faltan ${missing} pregunta${missing > 1 ? 's' : ''} por responder.`); return; }
    const sc = questions.reduce((n, q, i) => n + (answers[i] === q.c ? 1 : 0), 0);
    const earned = { ...state.earned };
    questions.forEach((q, i) => { if (answers[i] === q.c) earned['q' + i] = true; });
    const newly = sc === questions.length && !earned.all;
    if (sc === questions.length) earned.all = true;
    setState((s) => ({ ...s, score: sc, earned }));
    setScore(sc); setPhase('result');
    if (sc > 0) toast(newly ? '¡Completaste todas las microcertificaciones!' : 'Desbloqueaste microcertificaciones. Descárgalas abajo.');
  };

  const restart = () => {
    setPhase('idle');
    audio.current.currentTime = 0;
    audio.current.play().catch(() => {});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const download = async (c) => {
    const name = state.name.trim();
    if (name.length < 2) { toast('Escribe tu nombre para generar el certificado.'); document.getElementById('pName').focus(); return; }
    await downloadCert(c, name);
    toast('Certificado descargado.');
  };

  const shown = seeking ?? (dur ? (cur / dur) * 100 : 0);

  return (
    <section id="podcast" className={'view on block' + (playing ? ' playing' : '')}>
      <div className="wrap">
        <p className="eyebrow">Módulo 1 · OSINT 101</p>
        <h2>¿Cómo usan tus redes sociales en tu contra?</h2>
        <p className="sub">Análisis sobre inteligencia de fuentes abiertas y metadatos. Los conceptos aparecen en pantalla mientras escuchas.</p>

        <div className="card player">
          <audio ref={audio} src="audio/podcast.m4a" preload="metadata"
            onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
            onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
            onTimeUpdate={(e) => setCur(e.currentTarget.currentTime)}
            onEnded={() => { setPlaying(false); openQuiz(); }} />
          <div className="player-top">
            <button className="btn btn-primary round" type="button" onClick={togglePlay} aria-label={playing ? 'Pausar' : 'Reproducir'}>
              <span aria-hidden="true">{playing ? '❚❚' : '▶'}</span>
            </button>
            <div className="track">
              <div className="track-status">{playing ? 'Reproduciendo episodio' : cur > 0 ? 'Episodio en pausa' : 'Episodio listo'}</div>
              <input className="seek" type="range" min="0" max="100" step="0.1" value={shown} aria-label="Posición del episodio"
                onChange={(e) => setSeeking(+e.target.value)}
                onPointerUp={() => { if (seeking !== null && dur) audio.current.currentTime = (seeking / 100) * dur; setSeeking(null); }}
                onKeyUp={() => { if (seeking !== null && dur) audio.current.currentTime = (seeking / 100) * dur; setSeeking(null); }} />
              <div className="time"><span>{fmt(seeking !== null ? (seeking / 100) * dur : cur)}</span> / <span>{fmt(dur)}</span></div>
            </div>
          </div>
          <div className="concept" aria-live="polite">
            <div className="concept-k"><span className="dot" />Concepto en pantalla</div>
            <h3>{concept.title}</h3>
            <p>{concept.detail}</p>
          </div>
          <button className="link" type="button" onClick={openQuiz}>Ya lo escuché, ir al cuestionario</button>
        </div>

        {phase === 'quiz' && (
          <div className="card" ref={quizRef}>
            <h3>Evaluación OSINT</h3>
            <p className="sub">Demuestra lo aprendido con 3 preguntas.</p>
            {questions.map((q, i) => (
              <fieldset className="q-item" key={i}>
                <legend>{q.q}</legend>
                {q.o.map((o, j) => (
                  <label className="opt" key={j}>
                    <input type="radio" name={'pq' + i} checked={answers[i] === j} onChange={() => setAnswers((a) => ({ ...a, [i]: j }))} />
                    <span>{o}</span>
                  </label>
                ))}
              </fieldset>
            ))}
            <button className="btn btn-primary" type="button" onClick={submit}>Evaluar respuestas</button>
          </div>
        )}

        {phase === 'result' && (
          <div className="card result-card" ref={resultRef} aria-live="polite">
            <h3>Reporte de evaluación</h3>
            <div className="score">{score} / {questions.length}</div>
            <h4>{tiers[score][0]}</h4>
            <p>{tiers[score][1]}</p>
            <div className="cta">
              <a className="btn btn-primary" href="#ctf">Ahora, a los retos</a>
              <a className="btn btn-ghost" href="#pCerts">Ver mis microcertificaciones</a>
              <button className="btn btn-ghost" type="button" onClick={restart}>Repetir experiencia</button>
              <ShareButton title="Clave C*mún · Podcast" hash="podcast"
                text={`Saqué ${score}/${questions.length} en la evaluación OSINT del podcast de Clave C*mún. ¿Y tú?`}>Compartir resultado</ShareButton>
            </div>
          </div>
        )}

        <div id="pCerts" className="card certs">
          <h3>Tus microcertificaciones</h3>
          <p className="sub">Cada respuesta correcta del cuestionario desbloquea una microcertificación. Con las 3 correctas obtienes la completa. Descárgalas como imagen para compartirlas.</p>
          <div className="name-row">
            <label htmlFor="pName">Nombre que aparecerá en tu certificado</label>
            <input id="pName" type="text" maxLength={60} placeholder="Tu nombre completo" autoComplete="name"
              value={state.name} onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))} />
          </div>
          <div className="cert-grid">
            {certs.map((c) => {
              const ok = !!state.earned[c.id];
              return (
                <article key={c.id} className={'cert' + (ok ? ' earned' : '')}>
                  <span className="cert-k">{ok ? 'Obtenida' : 'Bloqueada'}</span>
                  <h4>{c.title}</h4><p>{c.desc}</p>
                  {ok
                    ? <button className="btn btn-primary small" type="button" onClick={() => download(c)}>Descargar PNG</button>
                    : <span className="locked">{c.id === 'all' ? 'Responde las 3 preguntas bien' : 'Acierta esta pregunta del cuestionario'}</span>}
                </article>
              );
            })}
          </div>
          <p className="fine">Son reconocimientos de participación de Clave C*mún; no constituyen una titulación acreditada.</p>
        </div>
      </div>
    </section>
  );
}
