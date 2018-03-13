import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {Link} from 'react-router-dom';
import * as NotificationActions from 'base/actions/notification';
import {connect} from 'react-redux';

class Notification extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  showError() {
    this.props.dispatch(NotificationActions.showError("Error Box", "This is alert message"));
  }

  showWarning() {
    this.props.dispatch(NotificationActions.showWarning("Warning Box", "This is warning message"));
  }

  showInfo() {
    this.props.dispatch(NotificationActions.showInfo("Info Box", "This is info message"));
  }

  showSuccess() {
    this.props.dispatch(NotificationActions.showSuccess("Success Box", "This is success message"));
  }

  render() {
    return (
      <MainLayout>
        <div>
          <button type="submit" className="btn btn-danger pull-right" onClick={this.showError.bind(this)}>Show Error</button>
          <button type="submit" className="btn btn-warning pull-right" onClick={this.showWarning.bind(this)}>Show Warning</button>
          <button type="submit" className="btn btn-info pull-right" onClick={this.showInfo.bind(this)}>Show Info</button>
          <button type="submit" className="btn btn-success pull-right" onClick={this.showSuccess.bind(this)}>Show Success</button>
        </div>
      </MainLayout>
    );
  }
}

export default connect()(Notification);
