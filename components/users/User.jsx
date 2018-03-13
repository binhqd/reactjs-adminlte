import React from 'react';
import style from './_User.scss';
import {Link} from 'react-router-dom';
import {UploadImage} from 'components/UI/Image';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ShowIf} from 'components/utils';
import {Users} from 'api';
import {toastr} from 'react-redux-toastr';
import {DateFormat} from 'components/UI/DateTime'

class User extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (typeof this.props.onClick == 'undefined') {
      // this.props.dispatch(openPopupUserDetail(this.props.id));
    } else {
      // this.props.onClick(e);
    }
  }

  render() {
    return (

      <tbody>
        <tr>
          <td>{this.props.index}</td>
          <td className="col-lg-1"><UploadImage type="USER" width="32" height="32" image={this.props.avatar} transform='crop'/></td>
          <td className="col-lg-7">
            <p>Fullname: {this.props.fullname}</p>
            <span className="name-link">{this.props.email}</span>
          </td>
          <td className="col-lg-2">
            <DateFormat value={this.props.createdAt}/>
          </td>
          <td className="col-lg-2">{this.props.actionPanel}</td>
        </tr>
      </tbody>


    );
  }
}

User.propTypes = {
  showDescription: PropTypes.bool,
  showUserButton: PropTypes.bool,
  enableSendUser: PropTypes.bool,
  enableAddUser: PropTypes.bool,
  saleUser: PropTypes.bool
};

User.defaultProps = {
  showDescription: true,
  showUserButton: true,
  enableSendUser: true,
  enableAddUser: false,
  saleUser: false,
  delete: false,
  actionPanel: null
};

export default connect()(User);
