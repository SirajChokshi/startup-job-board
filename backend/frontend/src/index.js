import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import './index.css';
import auth from './reducers/auth'
import App from './App';
import * as serviceWorker from './serviceWorker';

const initialState = {
  result: 0,
  lastValues: []
};

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//       case "ADD":
//         state = {
//           ...state,
//           result: state.result + action.payload,
//           lastValues: [...state.lastValues, action.payload]
//         };
//         break;
//       case "SUB":
//         state = {
//           ...state,
//           result: state.result - action.payload,
//           lastValues: [...state.lastValues, action.payload]
//         };
//         break;
//   }
//   return state;
// };

const store = createStore(auth);

// store.subscribe(() => {
//   console.log("STORE updated to: ", store.getState());
// });
//
// store.dispatch({
//   type: "ADD",
//   payload: 10
// });
//
// store.dispatch({
//   type: "SUB",
//   payload: 80
// });

// const StoreInstance = Store();

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
