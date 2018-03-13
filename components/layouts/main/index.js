import React from 'react';
import {Link} from 'react-router';

import Header from './Header.jsx';
import ASide from './ASide.jsx';
import Footer from '../../Footer';
import {ShowIf} from 'components/utils';
import {NotificationContext} from 'components/UI/Notification';
import ReduxToastr from 'react-redux-toastr';

class MainLayout extends React.Component {
  state = {};

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, {}));

    return (
      <div className="wrapper">
        <ReduxToastr
          timeOut={4000}
          newestOnTop={true}
          preventDuplicates={false}
          transitionIn="bounceIn"
          transitionOut="bounceOut"
          progressBar={true}
        />
        <Header/>
        <ASide/>
        <div className="content-wrapper" style={{minHeight: 600}}>
          <NotificationContext/>

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
