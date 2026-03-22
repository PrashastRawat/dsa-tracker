import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

export const THEMES = [
  { id: "f1",       label: "Dark Mode",    emoji: "🏎️",  dark: true  },
  { id: "valorant", label: "Light Mode",   emoji: "🎯",  dark: false },
  { id: "sakura",   label: "Sakura Mode",  emoji: "🌸",  dark: false },
  { id: "monster",  label: "Matrix Mode",  emoji: "💊",  dark: true  },
];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "f1");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);