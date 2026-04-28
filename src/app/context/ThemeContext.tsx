import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'matcha' | 'coffee';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('matcha');

  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'coffee') {
      root.classList.add('coffee-mode');
    } else {
      root.classList.remove('coffee-mode');
    }
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'matcha' ? 'coffee' : 'matcha'));
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
