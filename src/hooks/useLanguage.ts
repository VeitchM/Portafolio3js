import { useContext } from "react";
import LanguageContext from "../language";

export function useLanguage() {
  return useContext(LanguageContext);
}
