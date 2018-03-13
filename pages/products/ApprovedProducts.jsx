import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {Link} from 'react-router-dom';
import {Products} from 'base/api';
import {Product, ListProducts} from 'components/products';
import {toastr} from 'react-redux-toastr';

class ApprovedProducts extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {

    }
  }

  confirmDelete(id) {
    if (confirm("Bạn có muốn xóa sản phẩm này không?")) {
      Products.actions.delete.request({id}).then(response => {
        this.loadProducts();
      });
    }
  }

  updateField(item, fieldName, e) {
    Products.actions.update.request({id: item.id}, {
      data: {
        [fieldName]: !item[fieldName]
      }
    }).then(response => {
      Products.actions.approve.request({id: item.id}).then(end => {
        toastr.removeByType('success');
        toastr.success("Thành công", "Trạng thái của sản phẩm được cập nhật thành công");

        this.setState({
          items: {
            ...this.state.items,
            [this.state.items[item.id].id]: {
              ...this.state.items[item.id],
              [fieldName]: !this.state.items[item.id][fieldName]
            }
          }
        });
      });
    })
  }


  reject(item, reload, e) {
    Products.actions.update.request({id: item.id}, {
      data: {
        status: 2
      }
    }).then(response => {
      Products.actions.approve.request({id: item.id}).then(end => {
        toastr.removeByType('info');
        toastr.info("", "Sản phẩm đã bị từ chối");
        reload();
      });
    })
  }

  moveToAwaiting(item, reload, e) {
    Products.actions.update.request({id: item.id}, {
      data: {
        status: 0
      }
    }).then(response => {
      Products.actions.approve.request({id: item.id}).then(end => {
        toastr.removeByType('info');
        toastr.info("", "Sản phẩm đã được đưa vào danh sách chờ duyệt");
        reload();
      });
    })
  }

  render() {
    return (
      <MainLayout>
        <div>
          <h3>Sản phẩm đã duyệt</h3>
          <ListProducts status='APPROVED'
            actionPanel={(item, reload) => {
              return (
                <div>
                  <div className='row'>
                    <button className="btn btn-default" type="button" onClick={() => this.props.history.push(`/products/edit/${item.id}`)}>Sửa</button>
                    <button className="btn btn-primary" type="button" onClick={this.moveToAwaiting.bind(this, item, reload)}>Xem xét lại</button>
                    <button className="btn btn-primary" type="button" onClick={this.reject.bind(this, item, reload)}>Từ chối</button>

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

export default ApprovedProducts;
