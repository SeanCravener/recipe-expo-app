import { ThemeConfig } from "@/theme/interfaces";

// Type definitions for the theme configuration
export type Theme = ThemeConfig;
export type ThemeMode = "light" | "dark";
export type ThemeStructure = Record<ThemeMode, ThemeConfig>;
