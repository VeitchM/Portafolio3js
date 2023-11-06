import { ReactNode } from "react";
import { Themes, useTheme } from "../providers/ThemeProvider";

export default function Background(props: { children: ReactNode }) {
  const theme = useTheme();

  return (
    <div
      className={` h-full w-full ${
        theme === Themes.dark ? "bg-[#141944]" : "bg-[#fffef7]"
      } transition-colors`}
    >
      {props.children}
    </div>
  );
}
