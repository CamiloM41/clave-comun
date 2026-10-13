import { DX, AC, PL, RU, HR } from '../data/kit';
import ShareButton from '../components/ShareButton';

const Goto = ({ to, children }) => <a className="goto" href={'#' + to}>{children}</a>;

export default function Kit({ state: [S, setS] }) {
  const ans = S.dx.filter((v) => v !== null).length;
  const no = S.dx.filter((v) => v === 0).length, yes = S.dx.filter((v) => v === 1).length;
  const acN = S.ac.filter(Boolean).length, plN = S.pl.filter(Boolean).length;
  const pct = Math.round(((yes + acN) / (DX.length + AC.length)) * 100);
  const txt = pct >= 70 ? 'Bien protegido' : pct >= 35 ? 'En camino' : pct > 0 ? 'Hay mucho por hacer' : 'Empieza abajo';

  let lvl, msg, links = null;
  if (ans < DX.length) { lvl = `Responde las ${DX.length - ans} preguntas que faltan`; msg = 'Al terminar verás tu nivel de riesgo y por dónde empezar.'; }
  else if (no <= 3) { lvl = 'Vas bien'; msg = 'Mantén los hábitos y revisa de nuevo en 6 meses.'; links = <Goto to="acciones">Ver las 10 acciones</Goto>; }
  else if (no <= 6) { lvl = 'Hay brechas importantes'; msg = 'Empieza por correo, 2FA y copias de seguridad.'; links = <><Goto to="ac-2">Acción 2</Goto><Goto to="ac-3">Acción 3</Goto><Goto to="ac-5">Acción 5</Goto></>; }
  else { lvl = 'Riesgo alto'; msg = 'Dedica esta semana a las acciones 1 a 5 siguiendo el plan de 7 días.'; links = <><Goto to="ac-1">Empezar por la Acción 1</Goto><Goto to="plan">Plan de 7 días</Goto></>; }

  const seen = new Set();
  const pend = ans === DX.length ? DX.filter((d, i) => S.dx[i] === 0 && !seen.has(d[2]) && seen.add(d[2])) : [];

  const setDx = (i, v) => setS((s) => ({ ...s, dx: s.dx.map((x, k) => (k === i ? v : x)) }));
  const toggle = (key, i, v) => setS((s) => ({ ...s, [key]: s[key].map((x, k) => (k === i ? v : x)) }));
  const reset = () => {
    if (!confirm('¿Borrar todas tus respuestas y marcas del kit?')) return;
    setS({ dx: Array(DX.length).fill(null), ac: Array(AC.length).fill(false), pl: Array(PL.length).fill(false) });
  };

  const rulesText = 'Reglas de oro anti-estafa:\n' + RU.map((r) => `• ${r[0]} ${r[1]}`).join('\n');

  return (
    <section id="kit" className="view on block">
      <div className="wrap">
        <p className="eyebrow">Módulo 3 · Starter Pack</p>
        <div className="kit-hero">
          <div>
            <h2 className="kit-h">¿Qué tan protegido está tu negocio?</h2>
            <p className="sub">Responde 9 preguntas, marca las acciones que ya hiciste y sigue el plan de una semana. Sin ser técnico y casi sin gastar dinero.</p>
            <div className="cta">
              <a className="btn btn-primary" href="#acciones">Ir a las 10 acciones</a>
              <ShareButton title="Starter Pack de Ciberseguridad" hash="kit"
                text="Starter Pack de Ciberseguridad para Emprendedores: diagnóstico, 10 acciones y plan de 7 días.">Compartir el kit</ShareButton>
            </div>
          </div>
          <div className="ring" role="img" aria-label={'Nivel de protección: ' + pct + '%'}>
            <svg width="220" height="220" viewBox="0 0 220 220" aria-hidden="true">
              <circle className="bg" cx="110" cy="110" r="94" />
              <circle className="fg" cx="110" cy="110" r="94" strokeDasharray="590.6" strokeDashoffset={590.6 * (1 - pct / 100)} />
            </svg>
            <div className="lbl"><b>{pct}%</b><span>{txt}</span></div>
          </div>
        </div>

        <nav className="subnav" aria-label="Secciones del kit">
          <a href="#diagnostico">Diagnóstico</a><a href="#acciones">10 acciones</a><a href="#plan">Plan de 7 días</a><a href="#estafas">Anti-estafa</a><a href="#hackeo">Si te hackean</a>
        </nav>

        <div className="ksec" id="diagnostico">
          <h3>Mini diagnóstico</h3>
          <p className="sub">Cada "No" es una prioridad. Te llevamos directo a la acción que lo resuelve.</p>
          {DX.map((q, i) => (
            <div className="card q" key={i}>
              <p>{q[0]}</p>
              <div className="seg" role="group" aria-label={q[0]}>
                <button type="button" aria-pressed={S.dx[i] === 1} onClick={() => setDx(i, 1)}>Sí</button>
                <button type="button" aria-pressed={S.dx[i] === 0} onClick={() => setDx(i, 0)}>No</button>
              </div>
              {S.dx[i] === 0 && <p className="hint"><span>{q[1]}</span><Goto to={q[2]}>{q[3]}</Goto></p>}
            </div>
          ))}
          <div className="result" aria-live="polite">
            <h3>{lvl}</h3>
            <span>{ans === DX.length ? `Tienes ${no} "No". ` : ''}{msg}</span>
            {links && <div className="links">{links}</div>}
            {pend.length > 0 && (<>
              <p style={{ margin: '12px 0 0', fontSize: 15 }}>Tus "No" se resuelven aquí:</p>
              <div className="links">{pend.map((d) => <Goto key={d[2]} to={d[2]}>{d[3]}</Goto>)}</div>
            </>)}
            {ans === DX.length && (
              <div className="links">
                <ShareButton className="btn btn-ghost small" title="Starter Pack de Ciberseguridad" hash="kit"
                  text={`Mi nivel de protección en el Starter Pack de Ciberseguridad: ${pct}% (${txt}). Haz tu diagnóstico:`}>Compartir mi resultado</ShareButton>
              </div>
            )}
          </div>
        </div>

        <div className="ksec" id="acciones">
          <h3>Las 10 acciones esenciales</h3>
          <p className="sub">Ordenadas por impacto. Si solo puedes hacer unas pocas, empieza por las primeras.</p>
          <div className="bar"><i style={{ width: (acN / AC.length) * 100 + '%' }} /></div>
          {AC.map((a, i) => (
            <label className="card chk" id={'ac-' + (i + 1)} key={i}>
              <input type="checkbox" checked={S.ac[i]} onChange={(e) => toggle('ac', i, e.target.checked)} />
              <span className="cb" /><span className="txt"><b>{i + 1}. {a[0]}</b>{a[1]}</span>
            </label>
          ))}
        </div>

        <div className="ksec" id="plan">
          <h3>Plan de 7 días</h3>
          <p className="sub">Una tarea por día. Marca cada una cuando la termines o ve a la acción que la explica.</p>
          <div className="bar"><i style={{ width: (plN / PL.length) * 100 + '%' }} /></div>
          {PL.map((a, i) => (
            <label className="card chk" id={'dia-' + (i + 1)} key={i}>
              <input type="checkbox" checked={S.pl[i]} onChange={(e) => toggle('pl', i, e.target.checked)} />
              <span className="cb" /><span className="txt"><span className="day">Día {i + 1}</span><br />{a[0]}<br /><Goto to={a[1]}>{a[2]}</Goto></span>
            </label>
          ))}
        </div>

        <div className="ksec" id="estafas">
          <h3>Reglas de oro anti-estafa</h3>
          <p className="sub">Compártelas con tu equipo.</p>
          {RU.map((r, i) => <div className="card rule" key={i}><b>{r[0]}</b>{r[1]}</div>)}
          <ShareButton title="Reglas de oro anti-estafa" hash="estafas" text={rulesText}>Compartir las reglas con mi equipo</ShareButton>
        </div>

        <div className="ksec" id="hackeo">
          <h3>Si te hackean: la primera hora</h3>
          <p className="sub">Sigue los pasos en orden y con calma.</p>
          <ol className="steps">{HR.map((h, i) => <li key={i}><span><b>{h[0]}</b>{h[1]}</span></li>)}</ol>
        </div>

        <button className="btn btn-ghost small" id="kReset" type="button" onClick={reset}>Borrar mi progreso del kit</button>
      </div>
    </section>
  );
}
