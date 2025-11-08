import { createContext, useContext, useEffect, useState } from "react";

type Theme = "orange" | "blue";
type Mode = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("accent-theme");
    return (stored === "blue" ? "blue" : "orange") as Theme;
  });

  const [mode, setMode] = useState<Mode>(() => {
    const stored = localStorage.getItem("theme-mode");
    return (stored === "dark" ? "dark" : "light") as Mode;
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Apply mode
    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme-mode", mode);

    // Apply accent theme
    if (theme === "blue") {
      root.setAttribute("data-theme", "blue");
    } else {
      root.removeAttribute("data-theme");
    }
    localStorage.setItem("accent-theme", theme);
  }, [theme, mode]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
