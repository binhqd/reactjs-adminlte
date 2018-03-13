import React from 'react';
import {Link} from 'react-router-dom';
import {store} from 'base/routes';
import {Businesses} from 'api';
import {connect} from 'react-redux';
import CONFIG from 'base/constants/config';
import {UploadImage} from 'components/UI/Image';
import style from './_BusinessBox.scss';

class BusinessBox extends React.Component {
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
      <div className="media">
        <h3>
          {this.props.data.name}
          <div>
            <Link to={`/businesses/edit/${this.props.data.id}`} className="btn-actions"><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></Link> &nbsp;
            <a onClick={this.handleDelete.bind(this, this.props.data.id)} className="btn-actions"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
          </div>
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

        </div>
        <div className='action-panel'>
          <Link to={`/business/${this.props.data.id}/products`}>Quản lý sản phẩm</Link>
        </div>
      </div>
    );
  }
}

export default connect()(BusinessBox);
