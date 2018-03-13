import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {Link, withRouter} from 'react-router-dom';
import {Complains} from 'base/api';
import {Complain, ListComplains} from 'components/complains';
import {toastr} from 'react-redux-toastr';

class ComplainsContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {

    }
  }

  confirmDelete(id, reload) {
    if (confirm("Bạn có muốn xóa khiếu nại này không?")) {
      Complains.actions.delete.request({id}).then(response => {
        toastr.removeByType('success');
        toastr.success("", "Khiếu nại đã được xóa");
        reload();
      });
    }
  }

  updateField(item, fieldName, reload, e) {
    Complains.actions.update.request({id: item.id}, {
      data: {
        [fieldName]: !item[fieldName]
      }
    }).then(response => {
       toastr.removeByType('success');
      toastr.success("Thành công", "Trạng thái của khiếu nại đã được cập nhật thành công");
      reload();
    });
  }

  goDetail(id) {
    this.props.history.push(`/complains/${id}`)
  }


  render() {
    return (
      <MainLayout>
        <div>
          <h3>Danh sách các khiếu nại/Góp ý</h3>
          <ListComplains status='PENDING'
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

export default ComplainsContainer;
