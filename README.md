# Clave C*mún (React + Vite)

Podcast OSINT con microcertificaciones, reto CTF y kit de ciberseguridad para emprendedores, cada uno en su propia pestaña.

## Uso
```bash
npm install
npm run dev       # desarrollo en http://localhost:5173
npm run build     # genera la carpeta dist/
npm run preview   # prueba local de dist/
```

Publica el contenido de `dist/` en Netlify, Vercel o GitHub Pages. Luego escribe la dirección pública en
`src/lib/config.js` (`SITE_URL`) para que los enlaces de compartir funcionen para otras personas.

## Estructura
- `src/pages/` Home, Podcast, Ctf, Kit (una por pestaña)
- `src/data/` contenido: preguntas, retos, acciones, certificados
- `src/lib/` almacenamiento local, ruteo por hash, compartir/avisos y generador de certificados PNG
- `public/audio/podcast.m4a` audio del episodio
- `src/styles.css` estilos (#FFB300 · #333029 · #FFFFFF; Bricolage Grotesque + Atkinson Hyperlegible)

El progreso se guarda en el navegador (localStorage). Las tipografías se cargan de Google Fonts.
