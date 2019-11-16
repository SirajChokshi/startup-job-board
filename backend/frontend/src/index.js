import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import './index.css';
// import auth from './reducers/auth'
// import { login, logout } from './actions/authActions'
import App from './App';
import * as serviceWorker from './serviceWorker';

const initialState = {
  user: null,
  isAuthenticated: false
};

const reducer = (state = initialState, action) => {
//  console.log(action);
  switch (action.type) {
      case "LOGIN":
        state = {
          ...state,
          user: action.user,
          isAuthenticated: true
        };
        break;
      case "LOGOUT":
        state = {
          ...state,
          user: null,
          isAuthenticated: false
        };
        break;
      case "UPDATEUSER":
        state = {
          ...state,
          user: action.user,
        };
        break;
  }
  return state;
};

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
