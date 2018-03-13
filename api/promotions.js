import reduxApi, {transformers} from 'redux-api';
import customFetch from 'api/axios';
import CONFIG from 'base/constants/config';

const limit = 50;
const order = 'createdAt DESC';

// Example
const rest = reduxApi({
  // categories: {
  //   url: "categories/:id",
  //   crud: true
  // },
  get: {
    url: 'promotions/:id',
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    }
  },
  list: {
    url: `promotions?filter[limit]=${limit}&filter[order]=${order}`,
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    }
  },
  add: {
    url: 'promotions',
    options: {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  update: {
    url: 'promotions/:id',
    options: {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  upload: {
    url: 'containers/promotions/upload',
    options: {
      method: "POST"
    }
  },
  delete: {
    url: 'promotions/:id',
    options: {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  }
})
.use('fetch', customFetch)
.use("rootUrl", CONFIG.API_URL);

export default rest;
