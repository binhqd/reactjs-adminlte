// src/routes.js
import React from 'react';
import {createStore, applyMiddleware} from "redux";
import routerConfig from "base/routes/routes";
import thunk from "redux-thunk";
import {rootReducer} from "base/reducers";

let initialState = {};

if (typeof window != "undefined" && window.__REDUX_STATE__) {
  initialState = window.__REDUX_STATE__;
}

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

const routes = routerConfig(store);

export {store};
export default routes;
