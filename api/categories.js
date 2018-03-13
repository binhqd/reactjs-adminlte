import reduxApi, {transformers} from 'redux-api';
import customFetch from 'api/axios';
import CONFIG from 'base/constants/config';

// Example
const rest = reduxApi({
  // categories: {
  //   url: "categories/:id",
  //   crud: true
  // },
  list: {
    url: 'categories',
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    },
    postfetch: [
      function({data, dispatch}) {
        dispatch({
          type: 'CATEGORIES_TO_TREE',
          categories: data.data
        });
      },
      function({data, dispatch}) {
        dispatch({
          type: 'ARRAY_CATEGORIES_TO_HASH',
          categories: data.data
        });
      }
    ]
  },
  add: {
    url: 'categories',
    options: {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  upload: {
    url: 'categories/uploadLogo',
    options: {
      method: "POST"
    }
  },
  update: {
    url: 'categories/:id',
    options: {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  delete: {
    url: 'categories/:id',
    options: {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  }
}).use('fetch', customFetch)
.use("rootUrl", CONFIG.API_URL);

export default rest;
