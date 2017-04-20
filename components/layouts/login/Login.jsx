import React from 'react';
class LoginLayout extends React.Component {
  state = {};

  render() {
    //const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, {}));

    return (
      <div className="login-box">
        <div className="login-logo">
          <a href="../../index2.html"><b>Admin</b>LTE</a>
        </div>
        <div className="login-box-body">
          <p className="login-box-msg">Sign in to start your session</p>

          <form action="../../index2.html" method="post">
            <div className="form-group has-feedback">
              <input type="email" className="form-control" placeholder="Email"/>
              <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
            <div className="form-group has-feedback">
              <input type="password" className="form-control" placeholder="Password"/>
              <span className="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div className="row">
              <div className="col-xs-8">
                <div className="checkbox icheck">
                  <label>
                    <input type="checkbox" /> Remember Me
                  </label>
                </div>
              </div>
              <div className="col-xs-4">
                <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
              </div>
            </div>
          </form>

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
