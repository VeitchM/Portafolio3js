import React from 'react';
import { Wrapper1, SymbolWrapper, ToggleButton} from './Switch.styles.js'


const SwitchLanguage = (props) => {
    console.log(props)
    const language = props.language
    const change = props.setLanguage

    const onPressed = () => {
        const newLanguage = language == 'es' ? 'en' : 'es'
        change(newLanguage)
    }


    return (

        <Wrapper1 className='toggle-language'>

            <SymbolWrapper>
                <p>EN</p>

            </SymbolWrapper>

            <ToggleButton id='language-button' onClick={onPressed} class="toggle-button">
                <div className={'toggle-circle' + (props.language == 'es' ? ' slide' : '')} />
            </ToggleButton>

            <SymbolWrapper>
                <p>ES</p>


            </SymbolWrapper>
        </Wrapper1>
    )
}

export default SwitchLanguage

// <ToggleButton onClick={onPressed} class="toggle-button">
//                 <ToggleCircle className={props.language == 'es' ? ' slide' : ''} />
//             </ToggleButton>