import React from 'react';

require('admin-lte/plugins/iCheck/icheck.min.js')
class LoginLayout extends React.Component {
  state = {};

  componentDidMount() {
    document.body.className += " login-page";
  }

  render() {
    return (
      <div className="login-box">
        <div className="login-logo">
          <a href="../../index2.html"><b>Admin</b>LTE</a>
        </div>
        <div className="login-box-body">
          <p className="login-box-msg">Sign in to start your session</p>

          {this.props.children}

          <div className="social-auth-links text-center">
            <p>- OR -</p>
            <a href="#" className="btn btn-block btn-social btn-facebook btn-flat"><i className="fa fa-facebook"></i> Sign in using
              Facebook</a>
            <a href="#" className="btn btn-block btn-social btn-google btn-flat"><i className="fa fa-google-plus"></i> Sign in using
              Google+</a>
          </div>
          <a href="#">I forgot my password</a><br/>
          <a href="register.html" className="text-center">Register a new membership</a>

        </div>
      </div>
    );
  }
}

export default LoginLayout;
