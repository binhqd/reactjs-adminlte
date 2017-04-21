import React from 'react';
import {Link} from 'react-router';

import Header from './Header.jsx';
import ASide from './ASide.jsx';
import Footer from '../../Footer';

class MainLayout extends React.Component {
  state = {};

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, {}));

    return (
      <div className="wrapper">
        <Header/>
        <ASide/>
        <div className="content-wrapper" style={{minHeight: 600}}>
          <section className="content-header">
            <h1>
              Dashboard
              <small>Control panel</small>
            </h1>
            <ol className="breadcrumb">
              <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
              <li className="active">Dashboard</li>
            </ol>
          </section>
          <section className="content">
          {childrenWithProps}
          </section>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default MainLayout;
