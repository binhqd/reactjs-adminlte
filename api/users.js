import reduxApi from 'redux-api';
import customFetch from 'api/axios';
import CONFIG from 'base/constants/config';

const rest = reduxApi({
  me: {
    url: 'users/me',
    options: {
      method: 'GET'
    }
  },
  get: {
    url: 'users/:id',
    options:() => {
      return {
        method: 'GET',
        headers: {},
        data: {}
      };
    }
  },
  list: {
    url: `users`,
    options:() => {
      return {
        method: 'GET',
        headers: {},
        data: {}
      };
    }
  },
  count: {
    url: `users/count`,
    options:() => {
      return {
        method: 'GET',
        headers: {},
        data: {}
      };
    }
  },
  update: {
    url: 'users/:id',
    options: {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  add: {
    url: 'users',
    options: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  upload: {
    url: 'containers/users/upload',
    options: {
      method: 'POST'
    }
  },
  delete: {
    url: 'users/:id',
    options: {
      method: 'DELETE'
    }
  }
})
  .use('fetch', customFetch)
  .use('rootUrl', CONFIG.API_URL);

export default rest;
