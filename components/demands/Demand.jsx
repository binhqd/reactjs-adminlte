import React from 'react';
import style from './_Demand.scss';
import {Link} from 'react-router-dom';
import {UploadImage} from 'components/UI/Image';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ShowIf} from 'components/utils';
import {Demands} from 'api';
import {toastr} from 'react-redux-toastr';
import {DateTimeFormat} from 'components/UI/DateTime';

class Demand extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (typeof this.props.onClick == 'undefined') {
      // this.props.dispatch(openPopupDemandDetail(this.props.id));
    } else {
      // this.props.onClick(e);
    }
  }

  render() {
    return (

      <tbody>

        <tr>
          <td>{this.props.index}</td>
          <td>
            <p><b>{this.props.user && this.props.user.fullname}</b></p>
            <p>
              Email: <i>{this.props.user && this.props.user.email}</i><br/>
              SĐT: <i>{this.props.user && this.props.user.phone}</i>
            </p>
          </td>
          <td>
            <p>{this.props.content}</p>
          </td>
          <td><DateTimeFormat value={this.props.createdAt}/></td>
          <td>{this.props.actionPanel}</td>
        </tr>

      </tbody>


    );
  }
}

Demand.propTypes = {
  showDescription: PropTypes.bool,
  showDemandButton: PropTypes.bool,
  enableSendDemand: PropTypes.bool,
  enableAddDemand: PropTypes.bool,
  saleDemand: PropTypes.bool
};

Demand.defaultProps = {
  showDescription: true,
  showDemandButton: true,
  enableSendDemand: true,
  enableAddDemand: false,
  saleDemand: false,
  delete: false,
  actionPanel: null
};

export default connect()(Demand);
