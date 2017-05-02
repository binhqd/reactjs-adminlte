import reduxApi, {transformers} from 'redux-api';
import customFetch from 'api/axios';

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
  }
}).use('fetch', customFetch);

rest.use("rootUrl", "http://localhost:3000/api/");

export default rest;
