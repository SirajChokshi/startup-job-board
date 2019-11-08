import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

const reducer = (state, action) => {
  switch (action.type) {
      case "ADD":
        console.log("ADDED");
        break;
      case "SUBTRACT":
        break;
  }
  return state;
};

const store = createStore(reducer, 1);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
