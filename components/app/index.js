import React from 'react';
import {RenderRoutes} from 'base/routes';
import { withRouter } from 'react-router';
import {connect} from 'react-redux';
import { Auth, User } from 'api';
import {Categories} from 'api';
import {isAdmin} from 'base/actions';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.props.dispatch(isAdmin()).then(response => {
      if (response.isAuthenticated) {
        // this.props.history.push(this.props.defaultPage);
      } else {
        this.props.history.push('/');
      }
    });

    this.props.dispatch(Categories.actions.list({}, null, {}))
  }

  render() {
    return (
      <div>
        <RenderRoutes routes={this.props.route.routes}/>
      </div>
    );
  }
}

App.defaultProps = {
  defaultPage: "/categories"
}

export default connect()(withRouter(App));
