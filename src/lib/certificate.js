// Genera la microcertificación como imagen PNG con canvas.
function wrap(ctx, text, x, y, maxW, lh) {
  let line = '';
  text.split(' ').forEach((w) => {
    const t = line ? line + ' ' + w : w;
    if (ctx.measureText(t).width > maxW && line) { ctx.fillText(line, x, y); line = w; y += lh; } else line = t;
  });
  ctx.fillText(line, x, y);
  return y;
}

export async function downloadCert(cert, name) {
  try {
    await Promise.all([
      document.fonts.load('800 60px "Bricolage Grotesque"'),
      document.fonts.load('400 24px "Atkinson Hyperlegible"'),
      document.fonts.load('700 24px "Atkinson Hyperlegible"')
    ]);
  } catch { /* usa tipografía de respaldo */ }

  const W = 1400, H = 990;
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const g = cv.getContext('2d');
  const H1 = '"Bricolage Grotesque",system-ui,sans-serif', B = '"Atkinson Hyperlegible",system-ui,sans-serif';

  g.fillStyle = '#FFFFFF'; g.fillRect(0, 0, W, H);
  g.fillStyle = '#333029'; g.fillRect(0, 0, W, 18); g.fillRect(0, H - 18, W, 18); g.fillRect(0, 0, 18, H); g.fillRect(W - 18, 0, 18, H);
  g.fillStyle = '#FFB300'; g.fillRect(18, 18, W - 36, 170);
  g.fillStyle = '#333029'; g.textAlign = 'left'; g.textBaseline = 'alphabetic';
  g.font = `800 64px ${H1}`; g.fillText('Clave C*mún', 80, 128);
  g.textAlign = 'right'; g.font = `700 26px ${B}`; g.fillText('MICROCERTIFICACIÓN', W - 80, 118);
  g.textAlign = 'center';
  g.font = `400 28px ${B}`; g.fillText('Se otorga a', W / 2, 290);
  let fs = 84; g.font = `800 ${fs}px ${H1}`;
  while (g.measureText(name).width > W - 240 && fs > 36) { fs -= 4; g.font = `800 ${fs}px ${H1}`; }
  g.fillText(name, W / 2, 390);
  g.fillStyle = '#FFB300'; g.fillRect(W / 2 - 90, 420, 180, 8); g.fillStyle = '#333029';
  g.font = `400 28px ${B}`; g.fillText('por completar con éxito', W / 2, 490);
  g.font = `800 54px ${H1}`; const ly = wrap(g, cert.title, W / 2, 565, W - 280, 64);
  g.font = `400 26px ${B}`; g.fillStyle = '#6A655A'; wrap(g, cert.desc, W / 2, ly + 62, W - 360, 36);
  g.fillStyle = '#333029'; g.font = `700 24px ${B}`;
  const date = new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
  let h = 0; const str = name + cert.id + date;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  const code = 'CCM-' + h.toString(36).toUpperCase().padStart(7, '0').slice(0, 7);
  g.textAlign = 'left'; g.fillText(date, 80, H - 110);
  g.textAlign = 'right'; g.fillText('Código ' + code, W - 80, H - 110);
  g.textAlign = 'center'; g.font = `400 18px ${B}`; g.fillStyle = '#6A655A';
  g.fillText('Reconocimiento de participación de Clave C*mún. No es una titulación acreditada.', W / 2, H - 52);

  return new Promise((resolve) => {
    cv.toBlob((blob) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `microcertificacion-${cert.id}-clave-comun.png`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      resolve();
    }, 'image/png');
  });
}
