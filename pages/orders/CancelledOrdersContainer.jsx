import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {Link, withRouter} from 'react-router-dom';
import {Orders} from 'base/api';
import {Order, ListOrders} from 'components/orders';
import {toastr} from 'react-redux-toastr';

class ClosedOrdersContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {

    }
  }

  confirmDelete(id, reload) {
    if (confirm("Bạn có muốn xóa đơn hàng này không?")) {
      Orders.actions.delete.request({id}).then(response => {
        toastr.removeByType('success');
        toastr.success("", "Đơn hàng đã được xóa");
        reload();
      });
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

  goDetail(id) {
    this.props.history.push(`/orders/${id}`);
  }

  render() {
    return (
      <MainLayout>
        <div>
          <h3>Danh sách các đơn hàng</h3>
          <ListOrders status='CANCELLED'
            actionPanel={(item, reload) => {
              return (
                <div>
                  <div className='row'>
                    <button className="btn btn-primary" type="button" onClick={this.goDetail.bind(this, item.id)}>Chi tiết</button>&nbsp;
                    <button className="btn btn-danger" type="button" onClick={this.confirmDelete.bind(this, item.id, reload)}>Xóa</button>
                  </div>
                </div>
              )
            }
            }
          />
        </div>
      </MainLayout>
    );
  }
}

export default ClosedOrdersContainer;
