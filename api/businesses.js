import reduxApi, {transformers} from 'redux-api';
import customFetch from 'api/axios';

const limit = 20;

// Example
const rest = reduxApi({
  // categories: {
  //   url: "categories/:id",
  //   crud: true
  // },
  get: {
    url: 'businesses/:id',
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    }
  },
  list: {
    url: `businesses?filter[limit]=${limit}`,
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    }
  },
  filterByCat: {
    url: `businesses?filter[where][category_id][regexp]=^(:catID)&filter[where][name][regexp]=(:name)&filter[limit]=${limit}`,
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    }
  },
  add: {
    url: 'businesses',
    options: {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  update: {
    url: 'businesses/:id',
    options: {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  uploadLogo: {
    url: 'businesses/uploadLogo',
    options: {
      method: "POST"
    }
  },
  uploadImage: {
    url: 'businesses/uploadImage',
    options: {
      method: "POST"
    }
  },
  delete: {
    url: 'businesses/:id',
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
.use("rootUrl", "http://localhost:3000/api/");

export default rest;
