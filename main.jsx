import './style.css'
import Experience from './Experience/Experience';
import React from 'react';
import App from './Components/App';

import * as ReactDOMClient from 'react-dom/client';



const experience = new Experience(document.querySelector(".experience-canvas"));

const root = ReactDOMClient.createRoot(document.getElementById('reactTest'));

root.render(<App/>);