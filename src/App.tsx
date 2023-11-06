import React, { createContext, useContext, useEffect, useMemo } from "react";
import Section from "./components/Section/Section";
import SwitchLanguage from "./components/Switches/SwitchLanguage";
import SwitchTheme from "./components/Switches/SwitchTheme";
import Experience from "../Experience/Experience";
import "../style.css";

import testSect from "../Experience/Languages/content";
import Home from "./components/Home/Home";
import LanguageContext from "./contexts/language";
import MobileApp from "./components/MobileApp/MobileApp";
import AnimationDivider from "./components/AnimationDivider";
import Corridor from "./components/Corridor/Corridor";
import ThemeContext, {
  Themes,
  createTheme,
  useTheme,
} from "./providers/ThemeProvider";
import { PresentationControls } from "@react-three/drei";
import ThemeProvider from "./providers/ThemeProvider";
import Background from "./components/Background";

type Languages = "es" | "en";

const App = () => {
  const [language, setLanguage] = React.useState<Languages>("en");
  let sections = useMemo(
    () => testSect.map((sect) => sect[language]),
    [language]
  );

  // useEffect(() => {
  //   const canvas = document.querySelector(".experience-canvas");
  //   if (canvas) new Experience(canvas);
  //   else console.error("Canvas not found");
  // }, []);

  console.log("Exectuted before render");
  return (
    <>
      <ThemeProvider>
        <LanguageContext.Provider value={language}>
          <Background>
            <SwitchLanguage setLanguage={setLanguage} language={language} />
            <SwitchTheme />

            <Corridor />
            <Home />
            <AnimationDivider number={0} />
            <Section text={sections[0]} number={1} />

            <AnimationDivider number={1} />
            <Section text={sections[1]} number={2} />

            <AnimationDivider number={2} />
            <Section text={sections[2]} number={3} />

            <AnimationDivider number={1} />
            {/* <Section text={sections[3]} number={4} /> */}
            <MobileApp section={sections[3]} />
          </Background>
        </LanguageContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
