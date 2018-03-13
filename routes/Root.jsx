import React from 'react';
import PropTypes from 'prop-types'
import { RenderRoutes } from 'base/routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

const Root = ({ store, routes }) => (
  <Provider store={store}>
    <Router>
      <RenderRoutes routes={routes} />
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object,
  routes: PropTypes.array.isRequired
}

export default Root;
