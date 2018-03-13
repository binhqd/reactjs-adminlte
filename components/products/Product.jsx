import React from 'react';
import style from './_Product.scss';
import {Link} from 'react-router-dom';
import {UploadImage} from 'components/UI/Image';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ShowIf} from 'components/utils';
import {Products} from 'api';
import {toastr} from 'react-redux-toastr';

class Product extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (typeof this.props.onClick == 'undefined') {
      // this.props.dispatch(openPopupProductDetail(this.props.id));
    } else {
      this.props.onClick(e);
    }
  }

  render() {
    return (
      <div className={`product ${this.props.className}`}>
        <div className="wrap-img" onClick={this.onClick}>
          <UploadImage type="PRODUCT" width="177" height="127" image={this.props.images[this.props.images.length -1]} />
        </div>
        <p className="name">
          <Link to={`/product/${this.props.id}`} className="product-link"><span className="name-link">{this.props.name}</span></Link>

        </p>
        <ShowIf condition={!this.props.saleProduct}>
          <p className="price">GIÁ: {this.props.price}</p>
        </ShowIf>
        <ShowIf condition={this.props.saleProduct}>
          <div>
            <p className="price-sale">300000</p>
            <p className="price-old"><span className='price-throught'>{this.props.price}</span><span className='sale-percent'>-8%</span></p>
          </div>
        </ShowIf>
        <ShowIf condition={this.props.showDescription}>
          <p className="description">{this.props.description}</p>
        </ShowIf>
        {this.props.actionPanel}
      </div>
    );
  }
}

Product.propTypes = {
  showDescription: PropTypes.bool,
  showRequestButton: PropTypes.bool,
  enableSendRequest: PropTypes.bool,
  enableAddProduct: PropTypes.bool,
  saleProduct: PropTypes.bool
};

Product.defaultProps = {
  showDescription: true,
  showRequestButton: true,
  enableSendRequest: true,
  enableAddProduct: false,
  saleProduct: false,
  delete: false,
  actionPanel: null
};

export default connect()(Product);
