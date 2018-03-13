import reduxApi, {transformers} from 'redux-api';
import customFetch from 'api/axios';
import CONFIG from 'base/constants/config';

const limit = 500;
const order = 'createdAt DESC';

const rest = reduxApi({
  get: {
    url: 'contacts/:id',
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    }
  },
  list: {
    url: `contacts?filter[limit]=:limit&filter[skip]=:offset&filter[order]=${order}&isClosed=0`,
    options: {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  count: {
    url: `contacts/count`,
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    }
  },
  update: {
    url: 'contacts/:id',
    options: {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  delete: {
    url: 'contacts/:id',
    options: {
      method: "DELETE"
    }
  }
}).use('fetch', customFetch)
  .use('rootUrl', CONFIG.API_URL);

export default rest;
