import React from 'react';
import PropTypes from 'prop-types';
import {Route, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import ConnectedSwitch from './connectedSwitch.jsx';

const RenderRoutes = ({routes, auth, dispatch}) => {
  if (!routes) {
    return null;
  }
// console.log(dispatch)
  return (
    <ConnectedSwitch>
      {routes.map((route, i) => (
        <Route key={i} path={route.path} exact={route.exact} render={(props) => {
          if (route.activeMenu) {
            dispatch({
              type: 'SET_MENU_ACTIVE',
              id: route.activeMenu
            });
          }
          return (
            <div>
              {
                <route.component {...props} route={route} routes={route.routes}/>
              }
            </div>
          )
        }}/>
      ))}
    </ConnectedSwitch>
  );
};

RenderRoutes.propTypes = {
  routes: PropTypes.array.isRequired,
  parent: PropTypes.array
};

const mapStateToProps = state => ({});

export default withRouter(connect(mapStateToProps)(RenderRoutes));
