import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import routes, {store} from 'base/routes/index.jsx';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(createBrowserHistory(), store);

ReactDOM.render((
  <Provider store={store}>
    <Router history={history} children={routes}>
    </Router>
  </Provider>
), document.getElementById('root'));
