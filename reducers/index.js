import {createStore, combineReducers, applyMiddleware} from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import {categoriesAsTree, categoriesToHash} from 'base/reducers/categories';
import {listBusinesses} from 'base/reducers/businesses';
import {listPromotions} from 'base/reducers/promotions';
import {reducer as toastrReducer} from 'react-redux-toastr';

let rootReducer = combineReducers({
  categoriesAsTree: categoriesAsTree,
  categoryHash: categoriesToHash,
  listBusinesses,
  listPromotions,
  routing: routerReducer,
  toastr: toastrReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export {store, rootReducer};
