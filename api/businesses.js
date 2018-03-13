import reduxApi, {transformers} from 'redux-api';
import customFetch from 'api/axios';
import CONFIG from 'base/constants/config';

const limit = 500;
const order = 'createdAt DESC';

// Example
let endpoins = {
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
    url: `businesses`,
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    }
  },
  countAwaiting: {
    url: `businesses/awaiting/count?q=:q`,
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    }
  },
  countApproved: {
    url: `businesses/approved/count?q=:q`,
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    }
  },
  countRejected: {
    url: `businesses/rejected/count?q=:q`,
    options:(url, params, getState) => {
      return {
        method: "GET",
        headers: {},
        data: {}
      };
    }
  },
  listTopBusiness: {
    url: 'topBusinesses',
    options: {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  filterByCat: {
    url: `categories/:catID/businesses`,
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
  approve: {
    url: 'businesses/:id/approveUpdateInfo',
    options: {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  upload: {
    url: 'containers/businesses/upload',
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
  },

  listProducts: {
    url: 'businesses/:id/products?filter[limit]=100&filter[order]=createdAt%20DESC',
    options: {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  announcements: {
    url: 'businesses/:id/announcements',
    options: {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  countAnnouncement: {
    url: 'businesses/:id/announcements/count',
    options: {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  getBusinessCategories: {
    url: 'businesses/:id/categories',
    options: {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  }
}

const rest = reduxApi(endpoins)
.use('fetch', customFetch)
.use("rootUrl", CONFIG.API_URL);

export default rest;
