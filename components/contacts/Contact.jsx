import React from 'react';
import style from './_Contact.scss';
import {Link} from 'react-router-dom';
import {UploadImage} from 'components/UI/Image';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ShowIf} from 'components/utils';
import {Contacts} from 'api';
import {toastr} from 'react-redux-toastr';

class Contact extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (typeof this.props.onClick == 'undefined') {
      // this.props.dispatch(openPopupContactDetail(this.props.id));
    } else {
      // this.props.onClick(e);
    }
  }

  render() {
    return (

      <tbody>

        <tr>
          <td></td>
          <td className="col-lg-9">
            <p>Tên: {this.props.name}</p>
            <p>Email: {this.props.email}</p>
            <p>Số ĐT: {this.props.phone}</p>
          </td>
          <td className="col-lg-9">
            <p>{this.props.content}</p>
          </td>
          <td className="col-lg-2">{this.props.actionPanel}</td>
        </tr>

      </tbody>


    );
  }
}

Contact.propTypes = {
  showDescription: PropTypes.bool,
  showContactButton: PropTypes.bool,
  enableSendContact: PropTypes.bool,
  enableAddContact: PropTypes.bool,
  saleContact: PropTypes.bool
};

Contact.defaultProps = {
  showDescription: true,
  showContactButton: true,
  enableSendContact: true,
  enableAddContact: false,
  saleContact: false,
  delete: false,
  actionPanel: null
};

export default connect()(Contact);
