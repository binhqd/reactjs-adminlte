import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {NavLink, withRouter} from 'react-router-dom';

let MenuItem = (props) => {
  return (
    <li className={props.match.path == props.to ? props.activeClassName : ''}>
      <NavLink to={props.to} activeClassName={props.activeClassName}><i className={props.className || 'fa fa-circle-o'}></i>{props.label}
      {props.right}
      </NavLink>
      {props.children}
    </li>
  )
}

MenuItem.propTypes = {
  to: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired
}

MenuItem.defaultProps = {
  activeClassName: 'active'
}

export default withRouter(MenuItem);
