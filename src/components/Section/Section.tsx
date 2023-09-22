import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Section } from '../../../Experience/Languages/content';


const Section = (props:{text:Section, number:number}) => {
    const sectionText = props.text
    const number = props.number

    //Cardinal-move is used to trigger three.js animation
    const cardinal = ['', 'first', 'second', 'third']
    const side = number % 2 == 0 ? 'right' : 'left';
    const right = side === 'right'

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref })
    const { scrollYProgress: scrollTop } = useScroll({
        target: ref,
        offset: ["start start", "40% end"]
    })

    const { scrollYProgress: scrollBottom } = useScroll({
        target: ref,
        offset: ["end end","140% end"]
    })

    // const { scrollYProgress } = useScroll()
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.0001
    });

    const radiusTop = useTransform(() => scrollTop.get() * 700+40)
    const radiusBottom = useTransform(() => scrollBottom.get() * 700+40)

    const animatedStyle = right ? {  borderTopLeftRadius: radiusTop, borderBottomLeftRadius:radiusBottom } : {borderTopRightRadius:radiusTop, borderBottomRightRadius:radiusBottom}

    console.log(scrollYProgress.get(), scaleY.get());

    // const transform = useTransform()

    return (<>
        {/* BLANK SPACE FOR ANIMATION */}
        <div className={"section-margin " + cardinal[number] + "-move"} />


        <motion.section
            ref={ref}
            className={`${side === 'right' ? 'ml-auto ' : 'mr-auto '} 
            lg:w-1/2  bg-[var(--color-background)] relative
                py-[1100px] px-[4%] `}
            style={animatedStyle}
        >

            <div className={` ${right ? 'left-auto right-0' : 'left-0 right-auto'} absolute h-full top-0 w-3`}         >
                {/* ProgressBar */}
                <motion.div className={`bg-[var(--primary-color)]   origin-top h-full w-full`} style={{ scaleY }} />
            </div>

            <section className='relative text-[var(--primary-color)] pb-96 border-b-[2px] border-[var(--primary-color)] pl-[5%]'            >

                <h1 className='relative'>
                    <span className="text-4xl skew-y-[25deg] uppercase block pl-8 origin-left">
                        {sectionText.title}</span>
                    <div className="skew-y-[-25deg] block absolute border border-[var(--primary-color)] h-16 pl-8 top-0 z-50 origin-left max-w-[278px] w-full" />
                    <div className="skew-y-[-25deg] block absolute border border-[var(--primary-color)] h-16 pl-8 top-[80px] z-50 origin-left max-w-[278px] w-full"></div>
                    <div className="skew-y-[25deg] block absolute border border-[var(--primary-color)] bg-[currentColor] h-16 pl-8 top-[80px] z-50 origin-left max-w-[278px] w-full"></div>
                </h1>

                <span className="b-[15px] text-lg right-0 bottom-4 absolute">{number}</span>

            </section>


            <section className='relative pr-[20%] pl-[5%] lg:font-[18px] lg:pr-[90px]'>
                {
                    sectionText.content.map(subSection => (<>
                        <h3 key={subSection.subtitle} className="mt-16 text-3xl font-[600]">{subSection.subtitle}</h3>
                        {subSection.text.map(p => (
                            <p className='mt-[18px] lg:text-lg'>{p}</p>
                        ))
                        }
                        {subSection.link &&
                            <a key={subSection.link.show}
                                href={subSection.link.link}
                                className="mt-5 text-2xl">{subSection.link.show}</a>}
                    </>))
                }

            </section>
        </motion.section>
    </>
    );
};

export default Section;