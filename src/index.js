import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from "react-router-dom";

import "./assets/stylus/index.styl";

import App from "./App.js";

ReactDOM.render(
  <HashRouter>
    <App/>
  </HashRouter>,
  document.getElementById('root')
);
