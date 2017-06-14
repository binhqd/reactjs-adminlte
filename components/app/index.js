'use strict';
import React from 'react';
import {Categories} from 'api';
import {connect} from 'react-redux';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.props.dispatch(Categories.actions.list());

  }
  render() {
    return (
      <div className="wrapper">
        {this.props.children}
      </div>
    );
  }
}

export default connect()(App);
