import React from 'react';
import Section from './Section/Section';
import Switch from './Section/Switch';

import testSect from '../Experience/Languages/content';

const App = () => {
    const [language, setLanguage] = React.useState('en')
    let sections = testSect.map(sect => sect[language])
    console.log("Exectuted before render")
    return (

        <>
            <Switch setLanguage={setLanguage} language={language} />
            <Section text={sections[0]} number={1} />
            <Section text={sections[1]} number={2} />
            <Section text={sections[2]} number={3} />
        </>
    )
}

export default App