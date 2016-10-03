import {List, Map} from 'immutable';
import * as types from '../constants/ActionTypes'

const initialState = List.of();

export function quiz(state = initialState, action) {
  switch (action.type) {
    case types.ADD_QUIZ:
      return state.push(Map(action.quiz));
    case types.LOAD_QUIZ:
      action.quizList.toArray().map(item => {
        state = state.push(item);
      });
      return state;
    case types.DELETE_QUIZ:
      return state.filter(
        item => {
          return item.get('_id') !== action.id;
        }
      );
    default:
      return state;
  }
}
