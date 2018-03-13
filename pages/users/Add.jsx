import React from 'react';
import {PropTypes} from 'prop-types';
import {MainLayout} from 'components/layouts';
import {Link} from 'react-router-dom';
import {Users} from 'base/api';
import {UserForm} from 'components/users';
import {toastr} from 'react-redux-toastr';

class AddUser extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    }
  }

  cb(response) {
    toastr.removeByType("success");
    toastr.success('Thành công!', 'Người dùng đã được tạo thành công.');
    //
    this.props.history.push(`/users`);
  }

  render() {
    return (
      <MainLayout>
        <div>
          <Link to={`/users`}>Quay lại</Link>
          <h2 className='add-user-title'>Thêm người dùng mới</h2>
          <UserForm fnSubmit={Users.actions.add} cb={this.cb.bind(this)} type='ADD'/>
        </div>
      </MainLayout>

    );
  }
}

export default AddUser;
