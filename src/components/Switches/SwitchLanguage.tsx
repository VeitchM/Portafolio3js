import React, { Dispatch, useState } from "react";
import { Wrapper1, SymbolWrapper, ToggleButton } from "./Switch.styles";
import { useLanguage } from "../../hooks/useLanguage";
import { Language, Languages } from "../../contexts/language";
import { motion } from "framer-motion";
import Switch from "./SwitchButton";
const SwitchLanguage = (props: {
  setLanguage: Dispatch<React.SetStateAction<Language>>;
  language: Language;
}) => {
  console.log(props);

  const onClick = () => {
    props.setLanguage((language) => (language == Languages.es  ? Languages.en  : Languages.es ));
  };

  useLanguage();

  return (
    <motion.div
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{delay:0.5, duration:3}}
    
    
    >
      <Wrapper1 >
        <SymbolWrapper>
          <p>EN</p>
        </SymbolWrapper>

        <Switch switch={props.language == Languages.es } onClick={onClick}/>

        <SymbolWrapper>
          <p>ES</p>
        </SymbolWrapper>
      </Wrapper1>
    </motion.div>
  );
};

export default SwitchLanguage;

// <ToggleButton onClick={onPressed} class="toggle-button">
//                 <ToggleCircle className={props.language == 'es' ? ' slide' : ''} />
//             </ToggleButton>
