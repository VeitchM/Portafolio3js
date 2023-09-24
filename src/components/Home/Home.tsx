import React, { MutableRefObject, useEffect, useRef, useState } from "react";



import { motion, Variants } from "framer-motion";
import { useLanguage } from "../../hooks/useLanguage";
import ScrollArrow from "../ScrollArrow";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const subtitleDict = {
  en: "Advanced student of software engineering",
  es: "Estudiante avanzado de ingenieria informatica",
};

const subtitle2Dict = {
    en: "studying at UNMDP",
    es: "estudiando en UNDMP",
  };

const OPEN_DURATION: number = 0.7;
const CLOSE_DURATION: number = 0.3;

export default function Home() {
  const name = "Matias Veitch";

  const language = useLanguage();

  const [subtitle, setSubtitle] = useState(
    subtitleDict[language]
  );
  const [subtitle2, setSubtitle2] = useState(
    subtitle2Dict[language]
  );



  const [isOpen, setIsOpen] = useState("open");

  useEffect(() => {
    transitionOnSet(() => {setSubtitle(subtitleDict[language])
        setSubtitle2(subtitle2Dict[language])
    });
  }, [language]);

  function transitionOnSet(setter: () => void) {
    setIsOpen("closed");
    setTimeout(
      () => {
        setter();
        setIsOpen("open");
      },
      CLOSE_DURATION * 1000 * 1.4
    );
  }

  const nameRef = useRef(null)

  return (
    // it will be cool a fade out when start to go off screen
    <>

      <section className="w-screen h-screen p-24 pt-4 lg:pt-24">
        <motion.div
          initial="closed"
          className="w-full h-full flex flex-col relative"
          whileInView={isOpen}
          viewport={{ amount: 0.8 }}
          variants={{
            open: {
              transition: {
                type: "spring",
                bounce: 0,
                duration: OPEN_DURATION,
                delayChildren: 0.3,
                staggerChildren: 0.05,
              },
            },
            closed: {
              transition: {
                type: "spring",
                bounce: 0,
                duration: CLOSE_DURATION,
              },
            },
          }}
        >
          <AnimatedText ref={nameRef} text={name} className="text-3xl lg:text-7xl" />
          <AnimatedText className="text-xs lg:text-xl" text={subtitle} />
          <AnimatedText
            className="text-xs lg:text-lg absolute bottom-0 right-0"
            text={subtitle2}
          />
        </motion.div>
      </section>
  
    </>
  );
}

function AnimatedText(props: { text: string; className?: string, ref?:MutableRefObject<null> }) {
  const [prevText, setPrevText] = useState("");
  const [anim, setAnim] = useState("");

  useEffect(() => {}, [props.text]);
  return (
    <div  ref={props.ref} className={`whitespace-pre-wrap flex ${props.className}`}>
      {props.text.split("").map((letter, index) => {
        return (
          <motion.p key={index} variants={itemVariants}>
            {letter}
          </motion.p>
        );
      })}
    </div>
  );
}
