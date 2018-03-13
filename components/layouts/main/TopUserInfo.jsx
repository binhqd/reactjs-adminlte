import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {logout} from 'base/actions';

class TopUserInfo extends Component {

  handleLogout() {
    this.props.dispatch(logout()).then(() => {
      this.props.history.push('/');
    });
  }

  render() {
    return (
      <li className="dropdown user user-menu">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
          <img src={require('assets/images/user2-160x160.jpg')} className="user-image" alt="User Image"/>
          <span className="hidden-xs">{this.props.user ? this.props.user.email: ''}</span>
        </a>
        <ul className="dropdown-menu">
          <li className="user-header">
            <img src={require('assets/images/user2-160x160.jpg')} className="img-circle" alt="User Image"/>

            <p>
              {this.props.user ? this.props.user.email: ''}
              <small>Member since Nov. 2012</small>
            </p>
          </li>
          <li className="user-body">
            <div className="row">
              <div className="col-xs-4 text-center">
                <a href="#">Followers</a>
              </div>
              <div className="col-xs-4 text-center">
                <a href="#">Sales</a>
              </div>
              <div className="col-xs-4 text-center">
                <a href="#">Friends</a>
              </div>
            </div>
          </li>
          <li className="user-footer">
            <div className="pull-left">
              <a href="#" className="btn btn-default btn-flat">Profile</a>
            </div>
            <div className="pull-right" onClick={this.handleLogout.bind(this)}>
              <a href="javascript:void(0)" className="btn btn-default btn-flat">Sign out</a>
            </div>
          </li>
        </ul>
      </li>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProp)(withRouter(TopUserInfo));
