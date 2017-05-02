import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
import * as API from 'api';

let rootReducer = combineReducers({
  ...API.Categories.reducers,
  routing: routerReducer
});

export {rootReducer};
