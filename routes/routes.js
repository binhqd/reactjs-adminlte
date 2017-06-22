import App from 'components/app';
import Home from 'components/home';
import rest from "../api/rest";
import {Login, ListCategories, AddCategory, EditCategory} from "components/pages";

import {ListBusinesses, AddBusiness, EditBusiness} from 'components/pages/businesses';
import {ListPromotions, AddPromotion, EditPromotion} from 'components/pages/promotions';

const {actions} = rest;

export default function routes(options) {
  const {dispatch} = options;
  return {
    path: "/", component: App,
    // onEnter(state, replaceState, callback) {
    //   dispatch(actions.allQuiz.sync({}, null, callback));
    // },
    // onLeave() {
    //   dispatch(actions.allQuiz.reset());
    // }
    indexRoute: {
      component: Login
    },
    childRoutes: [
      {
        path: "home",
        component: Home
      },
      {
        path: "categories",
        component: ListCategories
      },
      {
        path: "categories/add",
        component: AddCategory
      },
      {
        path: "categories/edit/:id",
        component: EditCategory
      },
      {
        path: "businesses",
        component: ListBusinesses
      },
      {
        path: "businesses/add",
        component: AddBusiness
      },
      {
        path: "businesses/edit/:id",
        component: EditBusiness
      },
      {
        path: "promotions",
        component: ListPromotions
      },
      {
        path: "promotions/add",
        component: AddPromotion
      },
      {
        path: "promotions/edit/:id",
        component: EditPromotion
      }
    ]
  };
}
