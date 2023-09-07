import React from 'react';
import Section from './components/Section/Section';
import SwitchLanguage from './components/Switches/SwitchLanguage';
import SwitchTheme from './components/Switches/SwitchTheme';
import './index.css'


import testSect from '../Experience/Languages/content';

const App = () => {
    const [language, setLanguage] = React.useState('en')
    let sections = testSect.map(sect => sect[language])
    console.log("Exectuted before render")
    return (

        <>
        <div className='mt-24'></div>
            <SwitchTheme/>
            <SwitchLanguage  setLanguage={setLanguage} language={language} />
            <Section text={sections[0]} number={1} />
            <Section text={sections[1]} number={2} />
            <Section text={sections[2]} number={3} />
            <div className=''> </div>
        </>
    )
}

export default App