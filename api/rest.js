import reduxApi, {transformers} from "redux-api";
import adapterFetch from "redux-api/lib/adapters/fetch";
import map from "lodash/map";
import * as CONFIG from '../constants/config'
import {List, Map} from 'immutable';

export default reduxApi({
  // simple edpoint description
  // allQuiz: {
  //   url: `${CONFIG.API_URL}/quiz`,
  //   options: {
  //     header: {
  //       "Accept": "application/json"
  //     }
  //   }
  // },
  // apiQuiz: {
  //   url: `${CONFIG.API_URL}/quiz/:id`,
  //   crud: true
  // }
  auth : {
    url: `${CONFIG.API_URL}login`,
    options: {
      method: "post"
    }
  }

}).use("fetch", adapterFetch(fetch)); // it's necessary to point using REST backend
