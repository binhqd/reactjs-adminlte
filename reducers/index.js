import {createStore, combineReducers, applyMiddleware} from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import * as API from 'api';
import {categoriesAsTree, categoriesToHash} from 'base/reducers/categories';
import {listBusinesses} from 'base/reducers/businesses';
import {auth} from 'base/reducers/auth';
import {menu} from 'base/reducers/menu';
import {notification} from 'base/reducers/notifications';
import {reducer as toastrReducer} from 'react-redux-toastr';

let rootReducer = combineReducers({
  categoriesAsTree: categoriesAsTree,
  categoryHash: categoriesToHash,
  listBusinesses,
  routing: routerReducer,
  auth,
  notification,
  menu,
  toastr: toastrReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export {store, rootReducer};
