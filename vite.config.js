import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' permite publicar la carpeta dist en cualquier ruta (Netlify, Vercel, GitHub Pages…).
export default defineConfig({ base: './', plugins: [react()] });
