// import axios from 'axios';

// export default function customFetch(url, options) {
//   // return a promise of axios
//   return axios(url, options);
// }
import axios from 'axios';
import {store} from 'base/reducers';
import cookie from 'react-cookies';

function customFetch(url, options) {
  // return a promise of axios
  let at = cookie.load('accessToken');
  if (at) {
    axios.defaults.headers.common['Authorization'] = `${at}`;
  }


  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (401 === error.response.status) {
      // Force logout
      cookie.remove('accessToken', {path: '/'});

    } else {
      return Promise.reject(error);
    }
  });

  return new Promise((resolve, reject) => {
    axios(url, options).then(response => {
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
}

export default customFetch;
