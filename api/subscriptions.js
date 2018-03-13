import reduxApi, {transformers} from 'redux-api';
import customFetch from 'api/axios';
import CONFIG from 'base/constants/config';

const limit = 500;
const order = 'createdAt DESC';

const rest = reduxApi({
  list: {
    url: `subscriptions`,
    options: {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  count: {
    url: `subscriptions/count`,
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    }
  },
  update: {
    url: 'subscriptions/:id',
    options: {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  delete: {
    url: 'subscriptions/:id',
    options: {
      method: "DELETE"
    }
  }
}).use('fetch', customFetch)
  .use('rootUrl', CONFIG.API_URL);

export default rest;
