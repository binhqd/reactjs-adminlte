'use strict';
import React from 'react';
import { withRouter } from 'react-router-dom';
import {logout} from 'base/actions';

export default class NavMenu extends React.Component {
  handleLogout() {
    this.props.dispatch(logout()).then(() => {
      console.log('this');
      this.props.history.push('/');
    });
  }
  render() {
    return (
      <nav className="user-menu-content">
        <ul className="user-menu">
          <li className="item">
            <a href="#" className="menu-link">
              <i className="icon-left nailicon-calendar"/>
              <span className="text">My Bookings (3)</span>
            </a>
          </li>
          <li className="item">
            <a href="#" className="menu-link">
              <i className="icon-left nailicon-heart">Favorite Salon</i>
              <span className="text"/>
            </a>
          </li>
          <li className="item">
            <a href="#" className="menu-link">
              <i className="icon-left nailicon-avatar"/>
              <span className="text">Edit Profile</span>
            </a>
          </li>
          <li className="item" onClick={this.handleLogout.bind(this)}>
            <a href="#" className="menu-link">
              <i className="icon-left nailicon-log-out"/>
              <span className="text">Log out</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }

}

export default withRouter(NavMenu);
