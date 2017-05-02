import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
import * as API from 'api';
import categoriesAsTree from 'base/reducers/categories.js';

let rootReducer = combineReducers({
  ...API.Categories.reducers,
  categoriesAsTree: categoriesAsTree,
  routing: routerReducer
});

export {rootReducer};
