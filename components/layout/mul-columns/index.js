import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import Immutable from 'immutable';
import Header from '../../Header';
import Footer from '../../Footer';

class LayoutMulColumns extends React.Component {
  state = {};

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, {}));

    return (
      <div className="wrapper-container">
        <Header/>
        <div className="container-has-asibar">
          <div className="wrap-container">
            <div className="wrap-row">
              <div className="wrap-cols aside-left-content"></div>
              <div className="wrap-cols main-content">
                {childrenWithProps}
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

function bindStateToProps(state) {
  return {}
}

function bindDispatchToProps(dispatch) {
  return {

  }
}

export default connect(bindStateToProps, bindDispatchToProps)(LayoutMulColumns);
