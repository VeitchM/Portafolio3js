import React, { createContext, useContext, useEffect, useMemo } from "react";
import Section from "./components/Section/Section";
import SwitchLanguage from "./components/Switches/SwitchLanguage";
import SwitchTheme from "./components/Switches/SwitchTheme";
import Experience from "../Experience/Experience";
import "../style.css";

import testSect from "../Experience/Languages/content";
import Home from "./components/Home/Home";
import LanguageContext from "./language";
import MobileApp from "./components/MobileApp/MobileApp";
import AnimationDivider from "./components/AnimationDivider";

const ThemeContext = createContext<"light" | "dark">("light");

type Languages = "es" | "en";

const App = () => {
  const [language, setLanguage] = React.useState<Languages>("en");
  let sections = useMemo(
    () => testSect.map((sect) => sect[language]),
    [language]
  );

  useEffect(() => {
    const canvas = document.querySelector(".experience-canvas");
    if (canvas) new Experience(canvas);
    else console.error("Canvas not found");
  }, []);

  
  console.log("Exectuted before render");
  return (
    <>
      <ThemeContext.Provider value={"light"}>
        <LanguageContext.Provider value={language}>
          {/* <div className="mt-24"></div> */}
          <Home />
          <SwitchTheme />
          <SwitchLanguage setLanguage={setLanguage} language={language} />
          <AnimationDivider number={0} />
          <Section text={sections[0]} number={1} />

          <AnimationDivider number={1} />
          <Section text={sections[1]} number={2} />

          <AnimationDivider number={2} />
          <Section text={sections[2]} number={3} />

          <AnimationDivider number={1} />
          {/* <Section text={sections[3]} number={4} /> */}
          <MobileApp section={sections[3]} />

          <div className=""> </div>
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
