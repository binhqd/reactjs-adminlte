import React, {PropTypes} from 'react';
import { withRouter } from 'react-router-dom';
import {LoginLayout} from 'components/layouts/login';
import {login} from 'base/actions';
import {connect} from 'react-redux';

function ErrorText(props) {
  if (!props.errText) {
    return null;
  } else {
    return (
      <div className="pt-form-helper-text">
        <div className="pt-form-helper-text">{props.errText}</div>
      </div>
    )
  }
}

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      Username: '',
      Password: '',
      remember: false,
      loading: false,
      error: {}
    }
  }

  componentDidMount() {
    $('input').iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue',
      increaseArea: '20%' // optional
    });
  }

  handleChange(name, e) {
    this.setState({
      [name]: e.target.value,
    });
  }

  handleLogin() {
    this.setState({
      loading: true,
      error: {}
    });

    this.props.dispatch(login(this.state.Username, this.state.Password, this.state.remember)).then(response => {
      this.setState({loading: false});

      if (response.isAuthenticated) {
        this.props.history.push(this.props.defaultPage);
      } else if (response.data.errors) {
        let {status} = response.data;
        let {errors} = response.data.data;

        if (status === 400) {
          let errMessages = {};
          errors.map(item => {
            errMessages[item.source.pointer] = item.detail;
          });

          this.setState({
            error: errMessages
          });
        } else {
          let message = 'Login fail';
          if (errors) {
            message = errors.detail || message;
            this.setState({
              error : {
                password: 'Invalid email or password'
              }
            });
          }
        }
      }
    });
  }

  handleCheck(e) {
    this.setState({
      remember: !this.state.remember
    });
  }

  render() {
    return (
      <LoginLayout>
        <form onSubmit={this.handleLogin.bind(this)} action="javascript:void(0)" noValidate>
          <div className="form-group has-feedback">
            <input type="email" className="form-control" placeholder="Email" value={this.state.Username} onChange={this.handleChange.bind(this, 'Username')} autoFocus autoComplete = "off"
              maxLength={40}/>
            <ErrorText errText={this.state.error.email}/>
            <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
          </div>
          <div className="form-group has-feedback">
            <input type="password" className="form-control" placeholder="Password" name="Password" value={this.state.Password} onChange={this.handleChange.bind(this, 'Password')} autoFocus autoComplete = "off"
              maxLength={40}/>
            <ErrorText errText={this.state.error.password}/>
            <span className="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>
          <div className="row">
            <div className="col-xs-8">
              <div className="checkbox icheck">
                <label>
                  <input type="checkbox" checked={this.state.remember} onChange={this.handleCheck.bind(this)} /> Remember Me
                </label>
              </div>
            </div>
            <div className="col-xs-4">
              <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
            </div>
          </div>
        </form>
      </LoginLayout>
    );
  }
}

Login.defaultProps = {
  defaultPage: "/categories"
}

export default connect()(withRouter(Login));
