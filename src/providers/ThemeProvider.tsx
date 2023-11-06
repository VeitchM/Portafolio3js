import { ReactNode, createContext, useContext, useState } from "react";

export enum Themes {
  light = "light",
  dark = "dark",
}

/** Hook that provides the theme for ThemeContext.Provider */
function createTheme(theme: Theme = Themes.light) {
  return useState<Theme>(theme);
}

// const ThemeContext = createContext<Language>("en");
const ThemeContext = createContext<ReturnType<typeof createTheme>>([
  Themes.light,
  () => {},
]);

export function useTheme() {
  const [theme, _] = useContext(ThemeContext);
  return theme;
}

/** Returns a hook which changes theme */
export function useChangeTheme() {
  const [_, setTheme] = useContext(ThemeContext);
  return setTheme;
}

export type Theme = keyof typeof Themes;

export default function ThemeProvider(props: { children: ReactNode }) {
  const theme = createTheme();

  return (
    <ThemeContext.Provider value={theme}>
      {props.children}
    </ThemeContext.Provider>
  );
}
