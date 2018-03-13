import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {Link, withRouter} from 'react-router-dom';
import {Products} from 'base/api';
import {Product, ListProducts} from 'components/products';
import {toastr} from 'react-redux-toastr';

class RejectedProducts extends React.Component {
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

  approve(item, reload, e) {
    Products.actions.update.request({id: item.id}, {
      data: {
        status: 1
      }
    }).then(response => {
      Products.actions.approve.request({id: item.id}).then(end => {
        toastr.removeByType('success');
        toastr.success("Thành công", "Trạng thái của sản phẩm được cập nhật thành công");
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
          <h3>Sản phẩm bị từ chối</h3>
          <ListProducts status='REJECTED'
            actionPanel={(item, reload) => {
              return (
                <div>
                  <div className='row'>
                    <button className="btn btn-primary" type="button" onClick={this.approve.bind(this, item, reload)}>Duyệt</button>
                    <button className="btn btn-primary" type="button" onClick={this.moveToAwaiting.bind(this, item, reload)}>Xem xét lại</button>
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

export default withRouter(RejectedProducts);
