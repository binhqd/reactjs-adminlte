import reduxApi from 'redux-api';
import customFetch from 'api/axios';
import CONFIG from 'base/constants/config';
import { API_URL } from 'base/constants/config';

const limit = 20;

// Example
const rest = reduxApi({
  signin: {
    url: `/users/login`,
    options: (url, params, getState) => {
      return {
        method: 'POST',
        data: {},
      };
    }
 },
 signout: {
  url: `/users/logout`,
  options: (url, params, getState) => {
    return {
      method: 'POST',
      data: {},
    };
  }
}
})
.use('fetch', customFetch)
.use("rootUrl", CONFIG.API_URL);

export default rest;
