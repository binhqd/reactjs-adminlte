import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {Link, withRouter} from 'react-router-dom';
import {Demands} from 'base/api';
import {Demand, ListDemands} from 'components/demands';
import {toastr} from 'react-redux-toastr';

class DemandsContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {

    }
  }

  confirmDelete(id, reload) {
    if (confirm("Bạn có muốn xóa nhu cầu này không?")) {
      Demands.actions.delete.request({id}).then(response => {
        toastr.removeByType('success');
        toastr.success("", "Nhu cầu đã được xóa");
        reload();
      });
    }
  }

  updateField(item, fieldName, reload, e) {
    Demands.actions.update.request({id: item.id}, {
      data: {
        [fieldName]: !item[fieldName]
      }
    }).then(response => {
       toastr.removeByType('success');
      toastr.success("Thành công", "Trạng thái của nhu cầu đã được cập nhật thành công");
      reload();
    });
  }

  goDetail(id) {
    this.props.history.push(`/demands/${id}`)
  }


  render() {
    return (
      <MainLayout>
        <div>
          <h3>Các yêu cầu đặt hàng chờ xử lý</h3>
          <ListDemands status='PENDING'
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

export default DemandsContainer;
