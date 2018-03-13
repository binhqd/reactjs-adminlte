import reduxApi, {transformers} from 'redux-api';
import customFetch from 'api/axios';
import CONFIG from 'base/constants/config';

const limit = 500;
const orderDesc = 'createdAt DESC';
const orderASC = 'createdAt ASC';

const rest = reduxApi({
  get: {
    url: 'orders/:id?filter[include]=user&filter[include]=businesses',
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    }
  },
  detail: {
    url: 'orders/:id/orderDetails?filter[include]=product',
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    }
  },
  list: {
    url: `orders`,
    options: {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  listClosed: {
    url: `orders?filter[include]=user&filter[limit]=:limit&filter[skip]=:offset&filter[order]=${orderDesc}&filter[where][status]=1`,
    options: {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  count: {
    url: `orders/count`,
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    }
  },
  countClosed: {
    url: `orders/count`,
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    }
  },
  update: {
    url: 'orders/:id',
    options: {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  delete: {
    url: 'orders/:id',
    options: {
      method: "DELETE"
    }
  }
}).use('fetch', customFetch)
  .use('rootUrl', CONFIG.API_URL);

export default rest;
