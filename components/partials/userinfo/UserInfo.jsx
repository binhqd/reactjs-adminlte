import React, { Component } from 'react';
import style from './_userinfo.scss';

class UserInfo extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: this.props.user
    }
  }

  componentWilLReceiveProps(nextProps) {
    if (nextProps.user != this.state.user) {
      this.setState({
        user: nextProps.user
      })
    }
  }

  render() {
    return (
      <div>
        <table className='table table-striped col-lg-6'>
          <tbody className='userinfo-table-list'>
            <tr className='userinfo-item'>
              <td>Tên:</td>
              <td>{this.state.user.fullname}</td>
              <td>Email</td>
              <td><a href={`mailto:${this.state.user.email}`}>{this.state.user.email}</a></td>
            </tr>
            <tr className='userinfo-item'>
              <td>SĐT:</td>
              <td>{this.state.user.phone}</td>
              <td>Địa chỉ</td>
              <td>{this.state.user.address}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserInfo;
