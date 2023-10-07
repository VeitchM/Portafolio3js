import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Section } from "../../../Experience/Languages/common";

enum SIDE {
  RIGHT = "right",
  LEFT = "left",
}

const Section = (props: { text: Section; number: number }) => {
  const sectionText = props.text;
  const number = props.number;

  //Cardinal-move is used to trigger three.js animation
  const side = number % 2 == 0 ? SIDE.LEFT : SIDE.RIGHT;
  const right = side === SIDE.RIGHT;

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const { scrollYProgress: scrollTop } = useScroll({
    target: ref,
    offset: ["start start", "start end"],
  });

  const { scrollYProgress: scrollBottom } = useScroll({
    target: ref,
    offset: ["end end", "end start"],
  });

  // const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.0001,
  });

  const radiusTop = useTransform(() => scrollTop.get() * 700 + 40);
  const radiusBottom = useTransform(() => scrollBottom.get() * 700 + 40);

  const animatedStyle = right
    ? { borderTopLeftRadius: radiusTop, borderBottomLeftRadius: radiusBottom }
    : {
        borderTopRightRadius: radiusTop,
        borderBottomRightRadius: radiusBottom,
      };

  console.log(scrollYProgress.get(), scaleY.get());

  // const transform = useTransform()

  return (
    <>
      <motion.section
        ref={ref}
        className={`${right ? "ml-auto " : "mr-auto "} 
            lg:w-1/2  bg-background-color relative
                py-[500px] px-[4%] `}
        style={animatedStyle}
      >
        <div
          className={` ${
            right ? "left-auto right-0" : "left-0 right-auto"
          } absolute h-full top-0 w-3`}
        >
          {/* ProgressBar */}
          <motion.div
            className={`bg-primary   origin-top h-full w-full`}
            style={{ scaleY }}
          />
        </div>

        <section className="relative text-primary pb-96 border-b-[2px] border-primary pl-[5%]">
          <h1 className="relative">
            <span className="text-4xl skew-y-[25deg] w-96 uppercase block pl-8 origin-left">
              {sectionText.title}
            </span>
            <div className="skew-y-[-25deg] block absolute border border-primary h-16 pl-8 top-0 z-50 origin-left max-w-[278px] w-full" />
            <div className="skew-y-[-25deg] block absolute border border-primary h-16 pl-8 top-[80px] z-50 origin-left max-w-[278px] w-full"></div>
            <div className="skew-y-[25deg] block absolute border border-primary bg-[currentColor] h-16 pl-8 top-[80px] z-50 origin-left max-w-[278px] w-full"></div>
          </h1>

          <span className="b-[15px] text-lg right-0 bottom-4 absolute">
            {number}
          </span>
        </section>

        <section className="relative pr-[20%] pl-[5%] lg:font-[18px] lg:pr-[90px]">
          {sectionText.content.map((subSection) => (
            <>
              <h3
                key={subSection.subtitle}
                className="mt-16 text-3xl font-[600]"
              >
                {subSection.subtitle}
              </h3>
              {subSection.text.map((p) => (
                <p className="mt-[18px] lg:text-lg">{p}</p>
              ))}
              {subSection.link && (
                <div className="hover:animate-pulse transition-all mt-5 text-2xl">
                  <a key={subSection.link.show} href={subSection.link.link}>
                    {subSection.link.show}
                  </a>
                </div>
              )}
            </>
          ))}
        </section>
      </motion.section>
    </>
  );
};

export default Section;
