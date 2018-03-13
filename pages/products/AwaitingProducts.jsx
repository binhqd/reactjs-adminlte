import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {Link, withRouter} from 'react-router-dom';
import {Products} from 'base/api';
import {Product, ListProducts} from 'components/products';
import {toastr} from 'react-redux-toastr';

class AwaitingProducts extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  confirmDelete(id, reload) {
    if (confirm("Bạn có muốn xóa sản phẩm này không?")) {
      Products.actions.delete.request({id}).then(response => {
        reload();
      });
    }
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

  render() {
    return (
      <MainLayout>
        <div>
          <h3>Sản phẩm chờ duyệt</h3>
          <ListProducts status='AWAITING'
            actionPanel={(item, reload) => {
              return (
                <div>
                  <div className='row'>
                    <button className="btn btn-primary" type="button" onClick={this.approve.bind(this, item, reload)}>Duyệt</button>
                    <button className="btn btn-primary" type="button" onClick={this.reject.bind(this, item, reload)}>Từ chối</button>
                    <button className="btn btn-default" type="button" onClick={() => this.props.history.push(`/products/edit/${item.id}`)}>Sửa</button>
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

export default withRouter(AwaitingProducts);
