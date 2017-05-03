import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
import * as API from 'api';
import {categoriesAsTree, categoriesToHash} from 'base/reducers/categories';

let rootReducer = combineReducers({
  ...API.Categories.reducers,
  categoriesAsTree: categoriesAsTree,
  categoryHash: categoriesToHash,
  routing: routerReducer
});

export {rootReducer};
