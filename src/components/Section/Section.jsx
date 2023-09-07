import React from 'react';
import {SectionText,SectionDetailWrapper} from './Section.styles.js'

const Section = (props) => {
    const sectionText = props.text
    const number = props.number
    const cardinal = ['', 'first', 'second', 'third']
    const side = number % 2 == 0 ? 'right' : 'left';
    return (<>
        <div className={"section-margin " + cardinal[number] + "-move"}></div>


        <section className={cardinal[number] + "-section section " + side}>
            <div className={"progress-wrapper progress-bar-wrapper-" + side}>
                <div className="progress-bar"></div>
            </div>


            <section className="section-intro-wrapper">
                <h1 className="section-title">
                    <span className="section-title-text">{sectionText.title}</span>
                    <div className="section-title-decoration styleOne"></div>
                    <div className="section-title-decoration styleTwo"></div>
                    <div className="section-title-decoration styleThree"></div>
                </h1>
                <span className="section-number">{number}</span>
            </section>


            <section className='relative pr-[20%] pl-[5%] lg:font-[18px] lg:pr-[90px]'>
                {
                    sectionText.content.map(subSection => (<>
                        <h3 key={subSection.subtitle} className="section-heading">{subSection.subtitle}</h3>
                        {subSection.text.map(p => (
                            <p className='mt-[18px] lg:text-lg'>{p}</p>
                        ))
                        }
                        {subSection.link &&
                            <a key={subSection.link.show}
                                href={subSection.link.link}
                                className="link-text">{subSection.link.show}</a>}
                    </>))
                }

            </section>
        </section>
    </>
    );
};

export default Section;

// const styles = StyleSheet.create({

// })