/* ++++++++++ --------------- IMPORTS --------------- ++++++++++ */
// libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
// performance
import reportWebVitals from './reportWebVitals';
// redux
import store from './state/store/store';
// components
import App from './pages/app';
// styles
import './index.css';



/* !!!!!!!!!!!!!!!!!! ========== ~~~~~~~~~~ RENDER ~~~~~~~~~~ ========== !!!!!!!!!!!!!!!!!! */
ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
