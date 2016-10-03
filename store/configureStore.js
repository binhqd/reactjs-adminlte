import { createStore } from 'redux'
import { rootReducer } from '../reducers'

export function configureStore(state) {
  const store = createStore(rootReducer, state);

  return store;
}
