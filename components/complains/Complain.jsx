import React from 'react';
import style from './_Complain.scss';
import {Link} from 'react-router-dom';
import {UploadImage} from 'components/UI/Image';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ShowIf} from 'components/utils';
import {Complains} from 'api';
import {toastr} from 'react-redux-toastr';

class Complain extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (typeof this.props.onClick == 'undefined') {
      // this.props.dispatch(openPopupComplainDetail(this.props.id));
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
            <p>{this.props.content}</p>
          </td>
          <td className="col-lg-2">{this.props.actionPanel}</td>
        </tr>

      </tbody>


    );
  }
}

Complain.propTypes = {
  showDescription: PropTypes.bool,
  showComplainButton: PropTypes.bool,
  enableSendComplain: PropTypes.bool,
  enableAddComplain: PropTypes.bool,
  saleComplain: PropTypes.bool
};

Complain.defaultProps = {
  showDescription: true,
  showComplainButton: true,
  enableSendComplain: true,
  enableAddComplain: false,
  saleComplain: false,
  delete: false,
  actionPanel: null
};

export default connect()(Complain);
