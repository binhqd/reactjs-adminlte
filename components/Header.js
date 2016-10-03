'use strict';
import React from 'react';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);

  }

  componentDidMount() {
    console.log('Something goes here');
  }

  render() {
    return (
      <header className="header-container">
        This is header
      </header>
    );
  }

}

export default Header;
