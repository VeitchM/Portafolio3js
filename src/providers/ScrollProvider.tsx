import { ReactNode, createContext, useContext, useState } from "react";

export enum ScrollScreens {
  home = "home",
  about = "about",
  skills = "skills",
  interests = "interests",
  mobile = "mobile",
}

/** Hook that provides the theme for ThemeContext.Provider */ function createScroll(
  scroll: ScrollScreens = ScrollScreens.home
) {
  return useState<ScrollScreens>(scroll);
}

// const ThemeContext = createContext<Language>("en");
const ScrollContext = createContext<ReturnType<typeof createScroll>>([
  ScrollScreens.home,
  () => {},
]);

export function useScroll() {
  const [scroll, _] = useContext(ScrollContext);
  return scroll;
}

/** Returns a hook which changes theme */
export function useChangeScroll() {
  const [_, setScroll] = useContext(ScrollContext);
  return setScroll;
}

export type Scroll = keyof typeof ScrollScreens;

export default function ScrollProvider(props: { children: ReactNode }) {
  const scroll = createScroll();

  return (
    <ScrollContext.Provider value={scroll}>
      {props.children}
    </ScrollContext.Provider>
  );
}
