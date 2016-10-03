import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { Provider } from 'react-redux';
import { quiz } from './reducers/quiz';
import routes from "./routes/routes";
import thunk from "redux-thunk";
import reduxApi from "./api/rest";
import adapterFetch from "redux-api/lib/adapters/fetch";
import cookie from 'react-cookie';
import {notification} from 'base/reducers/notification';
import {authentication} from 'base/reducers/authentication';
import {setCurrentUser} from 'base/actions/userActions';

reduxApi.use("fetch", adapterFetch(fetch));

const reducer = combineReducers({
  ...reduxApi.reducers,
  quiz: quiz,
  notification: notification,
  authentication: authentication,
  routing: routerReducer
});
const finalCreateStore = applyMiddleware(thunk)(createStore);
const initialState = window.$REDUX_STATE;
const store = initialState ? finalCreateStore(reducer, initialState) : finalCreateStore(reducer);

if (cookie.load('userInfo')) {
  store.dispatch(setCurrentUser(cookie.load('userInfo')));
}

const childRoutes = routes(store);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render((
  <Provider store={store}>
    <Router history={history} children={childRoutes}>
    </Router>
  </Provider>
), document.getElementById('root'));
