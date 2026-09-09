import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createStyles } from './styles';

const palettes = {
  light: { blue: '#1554ED', primary: '#1554ED', ink: '#172B4D', muted: '#61718A', line: '#E5EBF3', pale: '#EFF5FF', bg: '#F6F8FC', surface: '#FFFFFF', green: '#237957', body: '#4C5F79', secondaryBorder: '#DFE9FF', message: '#F3F6FA', avatar: '#E2E8F0', successBg: '#EAF7F0', warningBg: '#FFF4E5' },
  dark: { blue: '#91B5FF', primary: '#184CC5', ink: '#EDF3FF', muted: '#AAB9D0', line: '#30405A', pale: '#223553', bg: '#101827', surface: '#192538', green: '#82D9AF', body: '#C3CFE1', secondaryBorder: '#3B5276', message: '#111D2F', avatar: '#30405A', successBg: '#183D33', warningBg: '#48351D' },
};
const themes = Object.fromEntries(Object.entries(palettes).map(([mode, C]) => [mode, { C, s: createStyles(C) }]));
const storageKey = 'cuidadonline.theme';
const ThemeContext = createContext(null);
function readPreference() {
  try { return globalThis.localStorage?.getItem(storageKey) === 'dark' ? 'dark' : 'light'; }
  catch { return 'light'; }
}

export function ThemeProvider({ children, forceLight = false }) {
  const [preference, setPreference] = useState(readPreference);
  const mode = forceLight ? 'light' : preference;
  useEffect(() => {
    const sync = (event) => {
      if (event.key === storageKey || event.key === null) setPreference(readPreference());
    };
    globalThis.addEventListener?.('storage', sync);
    return () => globalThis.removeEventListener?.('storage', sync);
  }, []);
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.style.colorScheme = mode;
    document.body.style.backgroundColor = palettes[mode].bg;
  }, [mode]);
  const value = useMemo(() => ({
    ...themes[mode], mode,
    toggleTheme: () => {
      const next = preference === 'dark' ? 'light' : 'dark';
      setPreference(next);
      try { globalThis.localStorage?.setItem(storageKey, next); } catch { /* Keep working when storage is unavailable. */ }
    },
  }), [mode, preference]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// New screens and shared components consume this hook to follow the global theme.
export function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error('useTheme must be used within ThemeProvider');
  return theme;
}
