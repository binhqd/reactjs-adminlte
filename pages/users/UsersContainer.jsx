import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {Link, withRouter} from 'react-router-dom';
import {Users} from 'base/api';
import {User, ListUsers} from 'components/users';
import {toastr} from 'react-redux-toastr';

class UsersContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {

    }
  }

  confirmDelete(id, reload) {
    if (confirm("Bạn có muốn xóa người dùng này không?")) {
      Users.actions.delete.request({id}).then(response => {
        reload();
      });
    }
  }

  updateField(item, fieldName, reload, e) {
    Users.actions.update.request({id: item.id}, {
      data: {
        [fieldName]: !item[fieldName]
      }
    }).then(response => {
       toastr.removeByType('success');
      toastr.success("Thành công", "Thông tin người dùng đã được cập nhật thành công");
      reload();
    });
  }

  render() {
    return (
      <MainLayout>
        <div>
          <h3>Quản lý người dùng</h3>
          <ListUsers
            actionPanel={(item, reload) => {
              return (
                <div>
                  <div className='row'>
                    <button className="btn btn-primary" onClick={() => this.props.history.push(`/users/${item.id}/edit`)}>Sửa</button>&nbsp;
                    <button className="btn btn-danger" onClick={this.confirmDelete.bind(this, item.id, reload)}>Xóa</button>
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

export default withRouter(UsersContainer);
