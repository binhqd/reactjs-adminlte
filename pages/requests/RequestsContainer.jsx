import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {Link, withRouter} from 'react-router-dom';
import {Requests} from 'base/api';
import {Request, ListRequests} from 'components/requests';
import {toastr} from 'react-redux-toastr';

class RequestsContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {

    }
  }

  confirmDelete(id, reload) {
    if (confirm("Bạn có muốn xóa yêu cầu này không?")) {
      Requests.actions.delete.request({id}).then(response => {
        toastr.removeByType('success');
        toastr.success("", "Yêu cầu đã được xóa");
        reload();
      });
    }
  }

  goDetail(id) {
    this.props.history.push(`/requests/${id}`)
  }

  updateField(item, fieldName, reload, e) {
    Requests.actions.update.request({id: item.id}, {
      data: {
        [fieldName]: !item[fieldName]
      }
    }).then(response => {
       toastr.removeByType('success');
      toastr.success("Thành công", "Trạng thái của yêu cầu đã được cập nhật thành công");
      reload();
    });
  }



  render() {
    return (
      <MainLayout>
        <div>
          <h3>Các yêu cầu đặt hàng chờ xử lý</h3>
          <ListRequests status='PENDING'
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

export default RequestsContainer;
