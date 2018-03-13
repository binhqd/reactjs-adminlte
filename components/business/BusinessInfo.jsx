import React from 'react';
import {Link} from 'react-router-dom';
import {store} from 'base/routes';
import {Businesses} from 'api';
import {connect} from 'react-redux';
import CONFIG from 'base/constants/config';
import {UploadImage} from 'components/UI/Image';
import style from './_BusinessInfo.scss';

class BusinessInfo extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  handleDelete(bizID, e) {
    if (confirm("Bạn có muốn xóa doanh nghiệp này?")) {
      Businesses.actions.delete.request({ id: bizID }).then(response => {
        // store.dispatch({
        //   type: 'REMOVE_CATEGORY',
        //   id: catID
        // });
        this.props.dispatch({
          type: 'REMOVE_BUSINESS',
          businessId: bizID
        });
      });
    }
  }

  render() {
    let Img = null;
    if (this.props.data.logo) {
      Img = <UploadImage width={128} height={128} type='BUSINESS' image={this.props.data.logo} transform='crop'/>
    } else {
      Img = <img className="media-object" src={require('assets/images/placeholder-128.jpg')} alt="..." width="128" height="128"/>;
    }

    return (
      <div className="media col-lg-12">
        <h3>
          {this.props.data.name}

        </h3>

        {
          <div className="media-left media-middle">
            <a href="#">
              {Img}
            </a>
          </div>
        }
        <div className="media-body">
          <p>Email: {this.props.data.email}</p>
          <p>Số Điện Thoại: {this.props.data.phone}</p>
          <p>Địa chỉ: {this.props.data.address}</p>
          <p>{this.props.data.description}</p>
        </div>
      </div>
    );
  }
}

export default connect()(BusinessInfo);
