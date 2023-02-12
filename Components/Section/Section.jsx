import React from 'react';

const Section = (sectionText, number) => {
    const cardinal =['','first','second','third']
    const side = number%2==0 ? 'right' :'left' ;
    return (<>
        <div className={"section-margin "+cardinal[number]+"-move"}></div>


        <section className={cardinal[number]+"-section section "+side}>
            <div className={"progress-wrapper progress-bar-wrapper-"+side}>
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


            <div className="section-detail-wrapper">
                {
                    sectionText.content.map(subSection => (<>
                        <h3 className="section-heading">{subSection.subtitle}</h3>
                        {subSection.text.map(p => (
                            <p>{p}</p>
                        ))
                        }
                    </>))
                }

            </div>
        </section>
    </>
    );
};

export default Section;