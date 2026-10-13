import { useEffect, useRef, useState } from 'react';
import { challenges, rivals, rankName } from '../data/ctf';
import { useToast } from '../lib/ui';
import ShareButton from '../components/ShareButton';

const TABS = [['retos', 'Retos'], ['terminal', 'Consola Shell'], ['rank', 'Clasificación']];
const BOOT = [
  { text: 'CYBER_OS v4.16.0 LTS (x86_64-pc-linux-gnu)', type: 'sys' },
  { text: 'Escribe "help" para ver la lista de comandos disponibles.', type: 'sys' }
];

export default function Ctf({ state: [S, setS] }) {
  const toast = useToast();
  const [tab, setTab] = useState('retos');
  const [category, setCategory] = useState('Todas');
  const [openId, setOpenId] = useState(null);
  const [selected, setSelected] = useState(null);

  const level = Math.floor(S.score / 250) + 1;
  const pct = Math.round((S.solved.length / challenges.length) * 100);
  const cats = ['Todas', ...new Set(challenges.map((c) => c.category))];
  const list = category === 'Todas' ? challenges : challenges.filter((c) => c.category === category);

  // Devuelve el resultado para usarlo desde el modal y desde la consola.
  const submitFlag = (id, input) => {
    const c = challenges.find((x) => x.id === id);
    if (!c) return { success: false, message: 'Reto no encontrado.' };
    if (S.solved.includes(id)) return { success: false, message: 'Ya has capturado esta bandera previamente.' };
    if (input.trim() === c.flag) {
      setS((s) => ({ ...s, solved: [...s.solved, id], score: s.score + c.points, streak: s.streak + 1 }));
      return { success: true, message: `¡Bandera correcta! +${c.points} XP` };
    }
    setS((s) => ({ ...s, streak: 0 }));
    return { success: false, message: 'Bandera incorrecta. Inténtalo de nuevo.' };
  };

  const unlockHint = (c) => {
    if (S.hints.includes(c.id)) return;
    if (S.score < c.hintCost) { toast('No tienes suficiente XP para comprar esta pista. ¡Resuelve otro reto primero!'); return; }
    setS((s) => ({ ...s, score: s.score - c.hintCost, hints: [...s.hints, c.id] }));
  };

  const reset = () => {
    if (!confirm('¿Reiniciar tus retos, puntos y pistas?')) return;
    setS({ solved: [], hints: [], score: 0, streak: 0 }); toast('Retos reiniciados.');
  };

  const ranking = [...rivals, { name: 'Tú', points: S.score, solved: S.solved.length, avatar: '👤', me: true }]
    .sort((a, b) => b.points - a.points || (a.me ? 1 : -1));

  const stats = [
    ['Puntos (XP)', S.score], ['Banderas capturadas', `${S.solved.length} / ${challenges.length}`],
    ['Progreso global', pct + '%'], ['Rango · Nivel ' + level, rankName(S.score)]
  ];

  return (
    <section id="ctf" className="view on block alt">
      <div className="wrap">
        <p className="eyebrow">Módulo 2 · Capture the Flag</p>
        <h2>Reto CTF: entrena tu ojo</h2>
        <p className="sub">Resuelve retos, captura banderas con formato <code>CTF{'{...}'}</code> y sube en la clasificación.</p>

        <div className="stats">
          {stats.map(([k, v], i) => <div className="stat" key={k}><span>{k}</span><b className={i === 3 ? 'rk' : undefined}>{v}</b></div>)}
        </div>

        <div className="tabs" role="tablist" aria-label="Vistas del reto">
          {TABS.map(([id, label]) => (
            <button key={id} type="button" role="tab" id={'tab-' + id} aria-selected={tab === id} onClick={() => setTab(id)}>{label}</button>
          ))}
        </div>

        {tab === 'retos' && (
          <div role="tabpanel" aria-labelledby="tab-retos">
            <div className="chips" role="group" aria-label="Filtrar por categoría">
              {cats.map((c) => <button key={c} className="chip" type="button" aria-pressed={c === category} onClick={() => setCategory(c)}>{c}</button>)}
            </div>
            <div className="grid">
              {list.map((c) => {
                const done = S.solved.includes(c.id);
                return (
                  <article key={c.id} className={'ch' + (done ? ' solved' : '')}>
                    <div>
                      <div className="ch-top"><span className="tag">{c.category}</span><span className="tag dif">{c.difficulty}</span></div>
                      <h3>{c.title}{done ? ' ✓' : ''}</h3><p>{c.description}</p>
                    </div>
                    <div className="ch-foot">
                      <span className="xp">+{c.points} <small>XP</small></span>
                      <div className="ch-btns">
                        <button className="btn btn-ghost small" type="button" title="Abrir en la consola" onClick={() => { setSelected(c); setTab('terminal'); }}>Consola</button>
                        <button className="btn btn-primary small" type="button" onClick={() => setOpenId(c.id)}>{done ? 'Revisar' : 'Resolver'}</button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {tab === 'terminal' && (
          <div role="tabpanel" aria-labelledby="tab-terminal">
            <Terminal selected={selected} submitFlag={submitFlag} />
          </div>
        )}

        {tab === 'rank' && (
          <div role="tabpanel" aria-labelledby="tab-rank">
            <ol className="rank">
              {ranking.map((u, i) => (
                <li key={u.name} className={u.me ? 'me' : ''}>
                  <span className="n">#{i + 1}</span><span className="av" aria-hidden="true">{u.avatar}</span>
                  <span className="who"><b>{u.name}</b><span>{u.solved} retos resueltos</span></span><span className="pts">{u.points} XP</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="cta end">
          <a className="btn btn-primary" href="#kit">Siguiente: el kit de protección</a>
          <ShareButton title="Clave C*mún · Reto CTF" hash="ctf"
            text={`Llevo ${S.solved.length}/${challenges.length} banderas y ${S.score} XP (${rankName(S.score)}) en el reto CTF de Clave C*mún. ¿Me superas?`}>Compartir mi puntaje</ShareButton>
          <button className="btn btn-ghost" type="button" onClick={reset}>Reiniciar retos</button>
        </div>
      </div>

      {openId && (
        <ChallengeModal key={openId} challenge={challenges.find((c) => c.id === openId)}
          solved={S.solved.includes(openId)} hintOn={S.hints.includes(openId)}
          onHint={unlockHint} onSubmit={submitFlag} onClose={() => setOpenId(null)} />
      )}
    </section>
  );
}

function ChallengeModal({ challenge: c, solved, hintOn, onHint, onSubmit, onClose }) {
  const ref = useRef(null);
  const [flag, setFlag] = useState('');
  const [fb, setFb] = useState(null);
  useEffect(() => { ref.current.showModal(); }, []);

  return (
    <dialog ref={ref} className="modal" aria-labelledby="mTitle" onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) ref.current.close(); }}>
      <div className="m-head">
        <div><span className="m-meta">{c.category} · +{c.points} XP</span><h2 id="mTitle">{c.title}</h2></div>
        <button className="btn btn-ghost small" type="button" onClick={() => ref.current.close()} aria-label="Cerrar">✕</button>
      </div>
      <div className="m-body">
        <div className="box">{c.description}</div>
        <div className="hintbox">
          <div className="hintbox-h"><span>Pista del reto</span>
            {!hintOn && !solved && <button className="btn btn-ghost small" type="button" onClick={() => onHint(c)}>Desbloquear (−{c.hintCost} XP)</button>}
          </div>
          <p style={{ margin: 0 }}>{hintOn ? '💡 ' + c.hint : <em>La pista está bloqueada. Puedes comprarla si te quedas atascado.</em>}</p>
        </div>
        {solved ? (
          <div className="box"><b>Explicación teórica (writeup)</b><br />{c.explanation}</div>
        ) : (
          <form className="flagform" autoComplete="off" onSubmit={(e) => { e.preventDefault(); setFb(onSubmit(c.id, flag)); }}>
            <label htmlFor="mFlag" style={{ width: '100%', fontWeight: 700 }}>Enviar flag</label>
            <input id="mFlag" type="text" placeholder="CTF{...}" spellCheck={false} value={flag} onChange={(e) => setFlag(e.target.value)} />
            <button className="btn btn-primary" type="submit">Enviar</button>
            <div style={{ width: '100%' }} aria-live="polite">{fb && !fb.success && <div className="fb err">{fb.message}</div>}</div>
          </form>
        )}
      </div>
    </dialog>
  );
}

function Terminal({ selected, submitFlag }) {
  const [logs, setLogs] = useState(BOOT);
  const [cmd, setCmd] = useState('');
  const box = useRef(null);
  useEffect(() => { box.current.scrollTop = box.current.scrollHeight; }, [logs]);

  const run = (e) => {
    e.preventDefault();
    const line = cmd.trim(); setCmd('');
    if (!line) return;
    const parts = line.split(/\s+/), main = parts[0].toLowerCase();
    const out = [{ text: '$ ' + line, type: 'user' }];
    switch (main) {
      case 'help': out.push({ text: 'Comandos disponibles:\n  help        - Muestra ayuda\n  clear       - Limpia la pantalla\n  whoami      - Usuario actual\n  cat <flag>  - Enviar flag al reto seleccionado\n  base64 -d   - Decodificar texto Base64\n  nmap        - Simular escaneo de puertos', type: 'res' }); break;
      case 'clear': setLogs([]); return;
      case 'whoami': out.push({ text: 'root@cyber-lab-node-01', type: 'res' }); break;
      case 'nmap': out.push({ text: 'Starting Nmap (simulado)…\n22/tcp   open  ssh\n80/tcp   open  http\n443/tcp  open  https\nNmap done: 1 IP address (1 host up)', type: 'res' }); break;
      case 'base64':
        if (parts[1] === '-d' && parts[2]) {
          try { out.push({ text: 'Decodificado: ' + atob(parts[2]), type: 'success' }); }
          catch { out.push({ text: 'Error: cadena Base64 no válida.', type: 'err' }); }
        } else out.push({ text: 'Uso: base64 -d <cadena_base64>', type: 'err' });
        break;
      case 'cat':
        if (parts[1] && selected) { const r = submitFlag(selected.id, parts[1]); out.push({ text: r.message, type: r.success ? 'success' : 'err' }); }
        else out.push({ text: 'Uso: cat <FLAG_AQUI> (selecciona un reto con el botón "Consola")', type: 'err' });
        break;
      default: out.push({ text: `Comando no reconocido: ${main}. Escribe "help".`, type: 'err' });
    }
    setLogs((l) => [...l, ...out]);
  };

  return (
    <div className="term">
      <div className="term-bar"><span>Interactive Shell</span>{selected && <span className="tag">Reto: {selected.title}</span>}</div>
      <div className="term-log" ref={box} tabIndex={0} aria-live="polite">
        {logs.map((l, i) => <div key={i} className={l.type}>{l.text}</div>)}
      </div>
      <form className="term-form" onSubmit={run} autoComplete="off">
        <label htmlFor="cCmd" className="prompt">$</label>
        <input id="cCmd" type="text" placeholder="Escribe un comando…" spellCheck={false} autoFocus value={cmd} onChange={(e) => setCmd(e.target.value)} />
        <button type="submit" className="btn btn-primary small">Enviar</button>
      </form>
    </div>
  );
}
