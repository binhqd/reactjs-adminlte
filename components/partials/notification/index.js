import React from 'react';
import * as CONFIG from 'base/constants/config';
//import style from './style';

class Notification extends React.Component {

  static get DEFAULT_TIMEOUT() {
    return 3000;
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      type: this.props.type,
      message: this.props.message
    }
  }

  removeNotification = function(event) {
    this.setState(...this.state, {message: ''});

    if (typeof this.props.removeCallback === 'function') {
      this.props.removeCallback();
    }
  }

  componentWillReceiveProps = function(nextProps, b) {
    let t = nextProps.time || Notification.DEFAULT_TIMEOUT;

    this.setState(...this.state, {
      type: nextProps.type,
      message: nextProps.message
    });

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    if (nextProps.message) {
      this.timeout = setTimeout(() => {
        this.removeNotification();
      }, t);
    }
  }

  render() {
    return (
      <div>
        {
          this.state.message
          ? <div className={`notification-container ${this.props.type}`}>
              <div>{this.state.message}</div>
              <button onClick={this.removeNotification.bind(this)}>Remove</button>
            </div>
          : ''
        }
      </div>
    );
  }
}
export default Notification;
