import { useEffect, useState } from 'react';

export function readStore(key, fallback) {
  try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : fallback; } catch { return fallback; }
}

// useState que persiste en localStorage (sin romper si el navegador lo bloquea).
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const stored = readStore(key, null);
    return stored ? { ...(typeof initial === 'object' && !Array.isArray(initial) ? initial : {}), ...stored } : initial;
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* sin almacenamiento */ }
  }, [key, value]);
  return [value, setValue];
}
