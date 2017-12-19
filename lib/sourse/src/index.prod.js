// es6兼容插件
import 'babel-polyfill';
// import '../../lib/flexible/flexible.min';
// react
import React from 'react';
import ReactDOM from 'react-dom';
// redux
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { BrowserRouter, Route } from 'react-router-dom';

// AppContainer
import App from './App';
// FastClick
// var FastClick = require('fastclick');
// FastClick.attach(document.body);
// redux相关
const middleware = [thunk];
const store = createStore(
  reducers,
  compose(
    applyMiddleware(...middleware)
  )
);
// react
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={`${process.env.ISAPP?'/app':''}/${process.env.INDEX}`}>
      <Route component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
