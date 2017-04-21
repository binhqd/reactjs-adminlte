import App from 'components/app';
import Home from 'components/home';
import rest from "../api/rest";
import {Login, ListCategories, AddCategory, EditCategory} from "components/pages";

const {actions} = rest;

export default function routes({dispatch}) {
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
      }
    ]
  };
}
