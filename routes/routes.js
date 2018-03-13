import App from 'components/app';
import Home from 'components/home';

import {Login} from 'pages';

const routes = [
  {
    component: App,
    routes: [
      {
        component: Login,
        exact: true,
        path: '/',
      },
      {
        path: '/home',
        exact: true,
        component: Home
      }
    ]
  }
];

export default routes;
