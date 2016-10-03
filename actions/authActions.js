import cookie from 'react-cookie';
import * as CONFIG from 'base/constants/config';

export function signinRequest(userData) {
  return dispatch => {
    return $.ajax({url: `${CONFIG.API_URL}auth/login`, method: 'POST', data: JSON.stringify(userData)}).done((response) => {
      const accessToken = response.data.id;

      cookie.save('accessToken', accessToken);
    })
  }
}

export function signupRequest(userData) {
  return dispatch => {
    return $.ajax({url: `${CONFIG.API_URL}users`, method: 'POST', data: JSON.stringify(userData)})
  }
}

export function signinFacebookRequest(data) {
  return dispatch => {
    return $.ajax({url: `${CONFIG.API_URL}auth/facebook`, method: 'POST', data: JSON.stringify(data)})
  }
}
