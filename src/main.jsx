import '../style.css'
import './index.css'
import Experience from '../Experience/Experience';
import React from 'react';
import App from './App';

import * as ReactDOMClient from 'react-dom/client';




const root = ReactDOMClient.createRoot(document.getElementById('reactSections'));

root.render(<App/>);
const experience = new Experience(document.querySelector(".experience-canvas"));