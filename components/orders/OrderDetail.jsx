import React from 'react';
import style from './_Order.scss';
import {Link, withRouter} from 'react-router-dom';
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

    this.state = {}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.order != this.state.order) {
      Orders.actions.detail.request({id: nextProps.order.id}).then(response => {
        this.setState({
          orderDetails: response.data,
          order: nextProps.order
        })
      })
    }
  }

  closeOrder(id) {
    if (confirm("Bạn có muốn kết thúc đơn hàng này không?")) {
      Orders.actions.update.request({id: this.state.order.id}, {
        data: {
          status: 1
        }
      }).then(response => {
        toastr.removeByType('success');
        toastr.success("Thành công", "Đơn hàng đã kết thúc");
        this.props.history.push('/orders')
      });
    }


  }

  render() {
    return (
      <div>
        {this.state.order &&
          <div>
            <table className="table table-striped col-lg-6">
              <tbody>
                <tr>
                  <td>Người mua hàng:</td>
                  <td>{this.state.order.user.fullname}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{this.state.order.user.email}</td>
                </tr>
                <tr>
                  <td>Số điện thoại</td>
                  <td>{this.state.order.user.phone}</td>
                </tr>
              </tbody>
            </table>

            <h3>Chi tiết đơn hàng</h3>
            <table className="table table-striped col-lg-6">
              <thead>
                <tr>
                  <th>#</th>
                  <th className='col-lg-2'>Hình sản phẩm</th>
                  <th className='col-lg-4'>Thông tin sản phẩm</th>
                  <th className='col-lg-2'>Đơn giá</th>
                  <th className='col-lg-1'>Số lượng</th>
                  <th className='col-lg-2'>Thành tiền</th>
                </tr>
              </thead>
              {
                this.state.orderDetails && this.state.orderDetails.map(item =>
                  <tbody>
                    <tr>
                      <td></td>
                      <td>
                        <UploadImage type="PRODUCT" width="100" height="100" image={item.product.images[item.product.images.length -1]} />
                      </td>
                      <td>
                        <span style={{fontWeight: 'bold'}}>{item.product.name}</span>
                      </td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>

                      <td>{(item.price * item.quantity)}</td>
                    </tr>
                  </tbody>
                )
              }
              <tfoot>
                <tr>
                  <td colSpan={6}>
                    <center><button className="btn btn-primary" type="button" onClick={this.closeOrder.bind(this)}>Kết thúc đơn</button></center>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        }
      </div>
    );
  }
}

Order.propTypes = {
  order: PropTypes.object
};

Order.defaultProps = {

};

export default withRouter(connect()(Order));
