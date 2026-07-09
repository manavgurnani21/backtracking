'use client';

import { useEffect, useState } from 'react';

function systemDark() {
  return typeof window !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = document.documentElement.dataset.theme;
    setDark(stored ? stored === 'dark' : systemDark());
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    const theme = next ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch {}
  }

  return (
    <button className="btn" onClick={toggle} aria-label="Toggle night drive theme">
      {dark === null ? '◐' : dark ? '☀ Daylight' : '☾ Night drive'}
    </button>
  );
}
