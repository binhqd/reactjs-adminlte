import reduxApi, {transformers} from 'redux-api';
import customFetch from 'api/axios';
import CONFIG from 'base/constants/config';

const limit = 500;
const order = 'createdAt DESC';

const rest = reduxApi({
  get: {
    url: 'requests/:id',
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    }
  },
  list: {
    url: `requests?isClosed=0`,
    options: {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  listClosed: {
    url: `requests?isClosed=1`,
    options: {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  count: {
    url: `requests/count`,
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    }
  },
  countClosed: {
    url: `requests/count`,
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    }
  },
  update: {
    url: 'requests/:id',
    options: {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  delete: {
    url: 'requests/:id',
    options: {
      method: "DELETE"
    }
  }
}).use('fetch', customFetch)
  .use('rootUrl', CONFIG.API_URL);

export default rest;
