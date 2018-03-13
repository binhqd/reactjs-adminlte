import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {Link, withRouter} from 'react-router-dom';
import {Subscriptions} from 'base/api';
import {Subscription, ListSubscriptions} from 'components/subscriptions';
import {toastr} from 'react-redux-toastr';

class SubscriptionsContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {

    }
  }

  confirmDelete(id, reload) {
    if (confirm("Bạn có muốn xóa email nhận tin này không?")) {
      Subscriptions.actions.delete.request({id}).then(response => {
        toastr.removeByType('success');
        toastr.success("", "Nhu cầu đã được xóa");
        reload();
      });
    }
  }

  updateField(item, fieldName, reload, e) {
    Subscriptions.actions.update.request({id: item.id}, {
      data: {
        [fieldName]: !item[fieldName]
      }
    }).then(response => {
       toastr.removeByType('success');
      toastr.success("Thành công", "Thông tin email nhận tin đã được cập nhật thành công");
      reload();
    });
  }

  goDetail(id) {
    this.props.history.push(`/subscriptions/${id}`)
  }


  render() {
    return (
      <MainLayout>
        <div>
          <h3>Các yêu cầu đặt hàng chờ xử lý</h3>
          <ListSubscriptions status='PENDING'
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

export default SubscriptionsContainer;
