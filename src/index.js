import './style.css';

import ReactDOM from 'react-dom';
import React from 'react';

import App from './App.js';

require('dotenv').config();

ReactDOM.render(<App />, document.getElementById('react-container'));