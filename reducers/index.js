import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
import * as API from 'api';
import {categoriesAsTree, categoriesToHash} from 'base/reducers/categories';
import {listBusinesses} from 'base/reducers/businesses';
import {listPromotions} from 'base/reducers/promotions';

let rootReducer = combineReducers({
  ...API.Categories.reducers,
  categoriesAsTree: categoriesAsTree,
  categoryHash: categoriesToHash,
  listBusinesses,
  listPromotions,
  routing: routerReducer
});

export {rootReducer};
