import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import App from './App';
import * as serviceWorker from './serviceWorker';

const initialState = {
  user: null,
  isAuthenticated: false,
  isStartup: false
};

const reducer = (state = initialState, action) => {
//  console.log(action);
  switch (action.type) {
      case "LOGIN":
        state = {
          ...state,
          user: action.user,
          isAuthenticated: true,
          isStartup: action.isStartup
        };
        break;
      case "LOGOUT":
        state = {
          ...state,
          user: null,
          isAuthenticated: false,
          isStartup: false
        };
        break;
      case "UPDATEUSER":
        state = {
          ...state,
          user: action.user
        };
        break;
      default:
        break;
  }
  return state;
};

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

let store = createStore(persistedReducer);
let persistor = persistStore(store);


ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
