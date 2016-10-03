import App from 'components/app';
import Home from 'components/home';
import rest from "../api/rest";

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
      component: Home
    },
    childRoutes: [
      {
        path: "home",
        component: Home
      }
    ]
  };
}
