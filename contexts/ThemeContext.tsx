import { createContext } from "react";
import { theme, Theme, ThemeMode } from "../theme/theme";

interface ThemeContextType {
  theme: Theme;
  mode: ThemeMode;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: theme.light,
  mode: "light",
  toggleTheme: () => {
    // Default implementation does nothing
  },
});
