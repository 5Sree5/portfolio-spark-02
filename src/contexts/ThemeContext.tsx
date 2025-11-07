import { createContext, useContext, useEffect, useState } from "react";

type Theme = "orange" | "blue";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("accent-theme");
    return (stored === "blue" ? "blue" : "orange") as Theme;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "blue") {
      root.setAttribute("data-theme", "blue");
    } else {
      root.removeAttribute("data-theme");
    }
    localStorage.setItem("accent-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
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
