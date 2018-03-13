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
    url: 'articles/:id',
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    }
  },
  list: {
    url: `articles?filter[limit]=${limit}&filter[order]=${order}`,
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    }
  },
  filterByCat: {
    url: `articles?filter[where][categoryId]=(:catID)&filter[limit]=${limit}&filter[order]=${order}`,
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    }
  },
  add: {
    url: 'articles',
    options: {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  update: {
    url: 'articles/:id',
    options: {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  upload: {
    url: 'containers/articles/upload',
    options: {
      method: "POST"
    }
  },
  delete: {
    url: 'articles/:id',
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
