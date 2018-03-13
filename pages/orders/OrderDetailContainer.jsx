import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {Link, withRouter} from 'react-router-dom';
import {Orders} from 'base/api';
import {OrderDetail} from 'components/orders';
import {toastr} from 'react-redux-toastr';

class OrdersContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: null
    }
  }

  updateField(item, fieldName, reload, e) {
    Orders.actions.update.request({id: item.id}, {
      data: {
        [fieldName]: !item[fieldName]
      }
    }).then(response => {
       toastr.removeByType('success');
      toastr.success("Thành công", "Trạng thái của đơn hàng đã được cập nhật thành công");
      reload();
    });
  }

  componentDidMount() {
    Orders.actions.get.request({id: this.props.match.params.id}).then(response => {
      this.setState({
        order: response.data
      })
    })
  }

  render() {
    return (
      <MainLayout>
        <div>
          <h3>Chi tiết đơn hàng</h3>
          <OrderDetail order={this.state.order}/>
        </div>
      </MainLayout>
    );
  }
}

export default OrdersContainer;
