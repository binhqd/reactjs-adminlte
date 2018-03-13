import React from 'react';
import {PropTypes} from 'prop-types';
import Promise from 'bluebird';
import {connect} from 'react-redux';
import {Users} from 'api';
import {withRouter} from 'react-router-dom';
import {SingleImageUploader} from 'components/uploader';
import CONFIG from 'base/constants/config';
import {ShowIf} from 'components/utils'

class UserForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      fullName: "",
      address: "",
      phone: "",
      gender: "",
      avatar: '',
      email: '',
      password: ''
    }
  }

  bindData(data) {
    const {fullName, address, phone, gender, avatar, email} = data;

    this.setState({
      fullName, address, phone, gender, avatar, email
    });
  }

  onInputChange(name, e) {
    let value = e.target ? e.target.value : e;
    this.setState({
      [name]: value
    })
  }

  submitForm(e) {
    e.preventDefault();

    let params = {};

    let data = {
      ...this.state
    }

    if (this.props.data && typeof this.props.data.id != "undefined") {
      params = {id: this.props.data.id};

      if (!data.password) {
        delete data.password
      }
    }

    if (confirm("Bạn có muốn lưu thông tin người dùng này?")) {
      return this.props.dispatch(this.props.fnSubmit(params, {
        data
      }))
        .then(response => {
          // reload list
          // this.props.dispatch(Users.actions.list());

          if (typeof this.props.cb == 'function') {
            this.props.cb(response);
          }

          return Promise.resolve(response)
        })
        .catch(err => {
          Promise.reject(err);
        })
    } else {
      return false;
    }


  }

  componentDidMount() {
    if (this.props.data) {
      this.bindData(this.props.data)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data != this.state.data) {
      this.bindData(nextProps.data);
    }
  }

  onUploadComplete(image) {
    this.setState({
      avatar: image.name
    })
  }

  onRemoveImage() {
    this.setState({
      avatar: ''
    })
  }

  render() {

    return (
      <div>
        <form onSubmit={this.submitForm.bind(this)}>
          <div className="form-group">
            <label>Tên đầy đủ</label>
            <input type="text" className="form-control" value={this.state.fullName} placeholder="Nhập tên" onChange={this.onInputChange.bind(this, 'fullName')}/>
          </div>
          <SingleImageUploader fnUpload={Users.actions.upload.request}
            onUploadComplete={this.onUploadComplete.bind(this)}
            image={this.state.avatar}
            onRemoveImage={this.onRemoveImage.bind(this)}
            type='USER'
          />

          <div className="form-group">
            <label>Email</label>
            <input type="text" className="form-control" value={this.state.email} placeholder="Nhập email" onChange={this.onInputChange.bind(this, 'email')}/>
          </div>

          <div className="form-group">
            <label>Số điện thoại</label>
            <input type="text" className="form-control" value={this.state.phone} placeholder="Nhập điện thoại" onChange={this.onInputChange.bind(this, 'phone')}/>
          </div>

          <div className="form-group">
            <label>Địa chỉ</label>
            <input type="text" className="form-control" value={this.state.address} placeholder="Nhập địa chỉ" onChange={this.onInputChange.bind(this, 'address')}/>
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input type="password" className="form-control" placeholder="Nhập mật khẩu" onChange={this.onInputChange.bind(this, 'password')}/>
          </div>

          <ShowIf condition={this.props.data}>
            <button type="submit" className="btn btn-primary btn-submit text-btn">Cập nhật</button>
          </ShowIf>&nbsp;
          <ShowIf condition={!this.props.data}>
            <button type="submit" className="btn btn-primary btn-submit text-btn">Thêm người dùng</button>
          </ShowIf>

          <button type='button' className="btn" onClick={() => this.props.history.push('/users')}>Thoát</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {

  }
}

UserForm.propTypes = {
  fnSubmit: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['ADD', 'EDIT'])
}

UserForm.defaultProps = {
  type: 'ADD'
}

UserForm.contextTypes = {
  router: React.PropTypes.object
};

export default withRouter(connect(mapStateToProps)(UserForm));
