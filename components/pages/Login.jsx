import React, {PropTypes} from 'react';
import {LoginLayout} from 'components/layouts/login';

class Login extends React.Component {
  render() {
    return (
      <LoginLayout>
        <div>
          This is login page
        </div>
      </LoginLayout>
    );
  }
}

export default Login;
