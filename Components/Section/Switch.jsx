import React from 'react';
import { Wrapper,Words } from './Switch.styles.js'


const Switch = (props) => {
    console.log(props)
    const language = props.language
    const change = props.setLanguage
    
    const onPressed = () =>{
        const newLanguage = language=='es'? 'en' : 'es'
        change(newLanguage)
    }


    return (

        <Wrapper className='toggle-language'>

            <Words>
                <p>EN</p>

            </Words>

            <button onClick={onPressed}      class="toggle-button">
                <div className={"toggle-circle"+(props.language=='es'? ' slide':'') }>


                </div>
            </button>
            <Words>
                <p>ES</p>


            </Words>
        </Wrapper>
    )
}

export default Switch