import reduxApi, {transformers} from 'redux-api';
import customFetch from 'api/axios';
import CONFIG from 'base/constants/config';

const limit = 500;
const order = 'createdAt DESC';

const rest = reduxApi({
  get: {
    url: 'products/:id',
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    }
  },
  list: {
    url: `products?filter[limit]=:limit&filter[skip]=:offset&filter[order]=${order}&filter[where][status]=1`,
    options: {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  listAwaiting: {
    url: `products?filter[limit]=:limit&filter[skip]=:offset&filter[order]=${order}&filter[where][status]=0`,
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    }
  },

  listRejected: {
    url: `products?filter[limit]=:limit&filter[skip]=:offset&filter[order]=${order}&filter[where][status]=2`,
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    }
  },
  countAwaiting: {
    url: `products/awaiting/count`,
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    }
  },
  countApproved: {
    url: `products/approved/count`,
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    }
  },
  countRejected: {
    url: `products/rejected/count`,
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    }
  },
  update: {
    url: 'products/:id',
    options: {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  approve: {
    url: 'products/:id/approveUpdateInfo',
    options: {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  listByBusiness: {
    url: 'businesses/:id/products',
    options: {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  countProductByBusiness: {
    url: 'businesses/:id/products/count',
    options: {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  product: {
    url: 'products/:id',
    options: {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  add: {
    url: 'products',
    options: {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  upload: {
    url: 'containers/products/upload',
    options: {
      method: "POST"
    }
  },
  delete: {
    url: 'products/:id',
    options: {
      method: "DELETE"
    }
  }
}).use('fetch', customFetch)
  .use('rootUrl', CONFIG.API_URL);

export default rest;
