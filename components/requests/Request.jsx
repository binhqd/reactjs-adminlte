import React from 'react';
import style from './_Request.scss';
import {Link} from 'react-router-dom';
import {UploadImage} from 'components/UI/Image';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ShowIf} from 'components/utils';
import {Requests} from 'api';
import {toastr} from 'react-redux-toastr';
import {DateTimeFormat} from 'components/UI/DateTime';

class Request extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (typeof this.props.onClick == 'undefined') {
      // this.props.dispatch(openPopupRequestDetail(this.props.id));
    } else {
      // this.props.onClick(e);
    }
  }

  render() {
    return (

      <tbody>

        {
          this.props.product &&
          <tr>
            <td>{this.props.index}</td>
            <td>
              <UploadImage type="PRODUCT" width="64" height="64" image={this.props.product.images[this.props.product.images.length -1]} />
            </td>
            <td>
              <p><b>{this.props.user && this.props.user.fullname}</b></p>
              <p>
                Email: <i>{this.props.user && this.props.user.email}</i><br/>
                SĐT: <i>{this.props.user && this.props.user.phone}</i>
              </p>
            </td>
            <td>

              <p>{this.props.description}</p>
            </td>
            <td><DateTimeFormat value={this.props.createdAt}/></td>
            <td>{this.props.actionPanel}</td>
          </tr>
        }

        <ShowIf condition={!this.props.product}>
          <tr>
            <td></td>
            <td><p>Sản phẩm hiện không còn tồn tại</p></td>
            <td><Link to={`/request/${this.props.id}`} className="request-link"><span className="name-link">{this.props.name}</span></Link></td>
            <td>{this.props.actionPanel}</td>

          </tr>
        </ShowIf>
      </tbody>


    );
  }
}

Request.propTypes = {
  showDescription: PropTypes.bool,
  showRequestButton: PropTypes.bool,
  enableSendRequest: PropTypes.bool,
  enableAddRequest: PropTypes.bool,
  saleRequest: PropTypes.bool
};

Request.defaultProps = {
  showDescription: true,
  showRequestButton: true,
  enableSendRequest: true,
  enableAddRequest: false,
  saleRequest: false,
  delete: false,
  actionPanel: null
};

export default connect()(Request);
