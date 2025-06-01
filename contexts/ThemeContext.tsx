import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";
import { theme, Theme, ThemeMode } from "@/theme/theme";

interface ThemeContextType {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const systemColorScheme = useColorScheme(); // "light" | "dark" | null
  const [mode, setModeState] = useState<ThemeMode>("light");
  const [currentTheme, setCurrentTheme] = useState<Theme>(theme.light);

  // Load stored preference or fallback to system preference
  useEffect(() => {
    const loadTheme = async () => {
      const storedMode = await AsyncStorage.getItem("themeMode");

      if (storedMode === "light" || storedMode === "dark") {
        applyMode(storedMode);
      } else if (
        systemColorScheme === "dark" ||
        systemColorScheme === "light"
      ) {
        applyMode(systemColorScheme);
      } else {
        applyMode("light");
      }
    };
    loadTheme();
  }, [systemColorScheme]); // rerender if system setting changes while app is open

  const applyMode = async (newMode: ThemeMode) => {
    setModeState(newMode);
    setCurrentTheme(theme[newMode]);
    await AsyncStorage.setItem("themeMode", newMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        mode,
        setMode: applyMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
