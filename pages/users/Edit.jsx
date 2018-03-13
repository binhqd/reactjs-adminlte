import React from 'react';
import {MainLayout} from 'components/layouts';
import {UserForm} from 'components/users';
import {Users} from 'base/api';
import {toastr} from 'react-redux-toastr';

class EditUser extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {}
    }
  }

  cb(response) {
    // Back to categories list
    // do aprrove
    toastr.removeByType("success");
    toastr.success("", "Cập nhật thành công");
  }

  componentDidMount() {
    Users.actions.get.request({id: this.props.match.params.id}).then(response => {
      this.setState({
        user: response.data
      })
    })
  }

  render() {
    return (
      <MainLayout>
        <div>
          <div className="register-logo">
            <b>Cập nhật thông tin người dùng</b>
          </div>
          <UserForm fnSubmit={Users.actions.update} cb={this.cb.bind(this)} data={this.state.user} type='EDIT'/>
        </div>
      </MainLayout>
    );
  }
}

EditUser.contextTypes = {
  router: React.PropTypes.object
};

export default EditUser;
