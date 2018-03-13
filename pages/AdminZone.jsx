import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import cookie from 'react-cookie';
import {toastr} from 'react-redux-toastr';

const MAX_RETRY = 1;
export default function(WrappedComponent) {
  class AdminZone extends Component {
    constructor(props, context) {
      super(props, context);

      this.retry = 0;
    }

    componentWillReceiveProps(nextProps) {
      if (!nextProps.auth || !nextProps.auth.isAuthenticated) {
        this.props.history.push('/signin');
      }
    }

    render() {
      if (this.props.businesses && this.props.businesses.mainBusiness) {
        this.retry = 0;
        return <WrappedComponent ref='wrappedComponent' {...this.props} businesses={this.props.businesses}/>;
      } else {
        if (this.props.auth && this.props.auth.isAuthenticated) {
          if (this.retry >= MAX_RETRY) {
            this.retry = 0;
            this.props.history.push('/register-business');
          }

          this.retry++;
          return null;
        } else {
          this.retry = 0;
          if (typeof cookie.load('accessToken') == 'undefined') {
            let instance = new WrappedComponent;

            toastr.error("Lỗi", "Bạn cần phải đăng nhập trước khi đăng ký thông tin doanh nghiệp");

            if (typeof instance.onUnauthorized == 'function') {
              instance.onUnauthorized().then(() => {
                this.props.history.push('/signin');
              })
            } else {
              this.props.history.push('/signin');
            }

            return null;
          } else {
            return null;
          }
        }
      }
    }
  }

  const bindStateToProps = state => {
    return {
      businesses: state.myBusinesses,
      auth: state.auth
    }
  }

  return withRouter(connect(bindStateToProps)(AdminZone));
}
