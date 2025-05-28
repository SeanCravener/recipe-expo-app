import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { ThemeContext } from "@/contexts/ThemeContext";
import { theme, ThemeMode } from "../theme/theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(colorScheme || "light");

  useEffect(() => {
    if (colorScheme) {
      setMode(colorScheme);
    }
  }, [colorScheme]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme: theme[mode], mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
