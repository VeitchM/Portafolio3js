import React, { useState } from "react";
import { motion, Variants } from "framer-motion";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export default function Home() {
  const name = "Matias Veitch";
  const subtitle = "Advanced student of software engineering";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="w-screen h-screen">
        <motion.div
          initial="closed"
          animate="open"
          variants={{
            open: {
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05,
              },
            },
            closed: {
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3,
              },
            },
          }}
        >
          <AnimatedText text={name} className="text-7xl" />
          <AnimatedText className="text-xl" text={subtitle} />
        </motion.div>
      </section>
      <section className=" w-screen h-24 fixed bottom-0 z-40">
        <div className="bg-blue-100/80 w-80 m-auto h-full rounded-full " />
      </section>
    </>
  );
}

function AnimatedText(props: { text: string; className?: string }) {
  return (
    <div className={`whitespace-pre-wrap flex ${props.className}`}>
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
