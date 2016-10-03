import * as CONFIG from 'base/constants/config';

export function userRequest() {
  return dispatch => {
    return $.ajax({method: 'GET', url: `${CONFIG.API_URL}me`}).done((response) => {
      dispatch(setCurrentUser(response.data.attributes));
    })
  }
}

export function updateUser(id, userInfo) {
  return dispatch => {
    return $.ajax({method: 'PATCH', url: `${CONFIG.API_URL}users/${id}`, data: JSON.stringify(userInfo)}).done((response) => {
      dispatch(setCurrentUser(response.data.attributes));
    })
  }
}

export function setCurrentUser(user) {
  return {type: 'SET_CURRENT_USER', user}
}
