import React from 'react';
import style from './_Order.scss';
import {Link} from 'react-router-dom';
import {UploadImage} from 'components/UI/Image';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ShowIf} from 'components/utils';
import {Orders} from 'api';
import {toastr} from 'react-redux-toastr';
import {DateTimeFormat} from 'components/UI/DateTime';

class Order extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (typeof this.props.onClick == 'undefined') {
      // this.props.dispatch(openPopupOrderDetail(this.props.id));
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
            <p>Người mua hàng: {this.props.customerName}</p>
            <p>Số điện thoại: {this.props.customerPhone}</p>
          </td>
          <td>
            <DateTimeFormat value={this.props.createdAt}/>
          </td>
          <td>
            <p>{this.props.amount}</p>
          </td>
          <td>{this.props.actionPanel}</td>
        </tr>

      </tbody>


    );
  }
}

Order.propTypes = {
  showDescription: PropTypes.bool,
  showOrderButton: PropTypes.bool,
  enableSendOrder: PropTypes.bool,
  enableAddOrder: PropTypes.bool,
  saleOrder: PropTypes.bool
};

Order.defaultProps = {
  showDescription: true,
  showOrderButton: true,
  enableSendOrder: true,
  enableAddOrder: false,
  saleOrder: false,
  delete: false,
  actionPanel: null
};

export default connect()(Order);
