import { createContext } from "react";

const LanguageContext = createContext<Language>("en");

export enum Languages {
  es = "es",
  en = "en",
}

export type Language = keyof typeof  Languages

export default LanguageContext;
