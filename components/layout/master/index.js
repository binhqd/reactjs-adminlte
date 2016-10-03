import React from 'react';
import {Link} from 'react-router';
import style from './style';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Immutable from 'immutable';
import Header from '../../Header';
import Footer from '../../Footer';
import Notification from 'components/partials/notification';

class LayoutMaster extends React.Component {
  state = {};

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, {}));

    return (
      <div className="wrapper-container">
        <Header/>
          {childrenWithProps}
        <Footer/>
      </div>
    );
  }
}

function bindStateToProps(state) {
  return {

  }
}

function bindDispatchToProps(dispatch) {
  return {

  }
}

export default connect(bindStateToProps, bindDispatchToProps)(LayoutMaster);
