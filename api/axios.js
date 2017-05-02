import axios from 'axios';

export default function customFetch(url, options) {
  // return a promise of axios
  return axios(url, options);
}
