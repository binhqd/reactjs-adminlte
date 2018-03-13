import React from 'react';
import style from './_Subscription.scss';
import {Link} from 'react-router-dom';
import {UploadImage} from 'components/UI/Image';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ShowIf} from 'components/utils';
import {Subscriptions} from 'api';
import {toastr} from 'react-redux-toastr';
import {DateFormat} from 'components/UI/DateTime'

class Subscription extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (typeof this.props.onClick == 'undefined') {
      // this.props.dispatch(openPopupSubscriptionDetail(this.props.id));
    } else {
      // this.props.onClick(e);
    }
  }

  render() {
    return (

      <tbody>

        <tr>
          <td>{this.props.index}</td>
          <td>
            <p>{this.props.email}</p>
          </td>
          <td>
            <DateFormat value={this.props.createdAt}/>
          </td>
          <td>{this.props.actionPanel}</td>
        </tr>

      </tbody>


    );
  }
}

Subscription.propTypes = {
  showDescription: PropTypes.bool,
  showSubscriptionButton: PropTypes.bool,
  enableSendSubscription: PropTypes.bool,
  enableAddSubscription: PropTypes.bool,
  saleSubscription: PropTypes.bool
};

Subscription.defaultProps = {
  showDescription: true,
  showSubscriptionButton: true,
  enableSendSubscription: true,
  enableAddSubscription: false,
  saleSubscription: false,
  delete: false,
  actionPanel: null
};

export default connect()(Subscription);
