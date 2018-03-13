import React, { Component } from 'react';
import {ShowIf} from 'components/utils';
import {connect} from 'react-redux';

class NotificationContext extends Component {
  closeNotification() {
    this.props.dispatch({
      type: 'CLOSE_NOTIFICATION'
    });
  }

  render() {
    return (
      <div className="box box-default">
        <div className="box-body">
          <ShowIf condition={this.props.notification.type == 'SHOW_ERROR'}>
            <div className="alert alert-danger alert-dismissible">
              <button type="button" className="close" data-dismiss="alert" aria-hidden="true" onClick={this.closeNotification.bind(this)}>×</button>
              <h4><i className="icon fa fa-ban" /> {this.props.notification.title}</h4>
              {this.props.notification.message}
            </div>
          </ShowIf>

          <ShowIf condition={this.props.notification.type == 'SHOW_INFO'}>
            <div className="alert alert-info alert-dismissible">
              <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
              <h4><i className="icon fa fa-info" /> {this.props.notification.title}</h4>
              {this.props.notification.message}
            </div>
          </ShowIf>

          <ShowIf condition={this.props.notification.type == 'SHOW_WARNING'}>
            <div className="alert alert-warning alert-dismissible">
              <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
              <h4><i className="icon fa fa-warning" /> {this.props.notification.title}</h4>
              {this.props.notification.message}
            </div>
          </ShowIf>

          <ShowIf condition={this.props.notification.type == 'SHOW_SUCCESS'}>
            <div className="alert alert-success alert-dismissible">
              <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
              <h4><i className="icon fa fa-check" /> {this.props.notification.title}</h4>
              {this.props.notification.message}
            </div>
          </ShowIf>
        </div>
      </div>
    );
  }

}


const bindReduxStateToComponentProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(bindReduxStateToComponentProps)(NotificationContext);
