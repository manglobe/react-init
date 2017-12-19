/* jshint esversion: 6 */
// es6兼容插件
import 'babel-polyfill';
// import '../../lib/flexible/flexible.min';
// react
import React from 'react';
import ReactDOM from 'react-dom';
// redux
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import Reducers from './reducers';
// react-hot-loader
import { AppContainer } from 'react-hot-loader';
// AppContainer
import App from './App';

// react-hot-loader兼容代码
let AppContainerKey = 0;
// redux相关
const logger = createLogger();
const middleware = [thunk, logger];
const store = createStore(
  Reducers,
  compose(
    applyMiddleware(...middleware)
  )
);
// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers');
    store.replaceReducer(nextRootReducer);
  });
}
// react
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        {/* <BrowserRouter basename={`/app/${process.env.INDEX}`}> */}
        <BrowserRouter basename="/app/workreport">
          <Route component={Component} />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
};
render(App);
if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
