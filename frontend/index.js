import { render } from "react-dom";
import React from 'react';
import { App } from "./App";

import './style.css';

const appRoot = document.getElementById('app');

render(<App />, appRoot);