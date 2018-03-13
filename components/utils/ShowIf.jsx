import React, { Component } from 'react';
import {PropTypes} from 'prop-types';

class ShowIf extends Component {

  render() {
    if (this.props.condition) {
      return this.props.children;
    } else {
      return null;
    }
  }

}

ShowIf.proptTypes = {
  condition: PropTypes.bool.isRequired
}

export default ShowIf;
