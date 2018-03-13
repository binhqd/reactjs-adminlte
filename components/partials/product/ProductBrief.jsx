import React from 'react';
import style from './_productBrief.scss';
import {Link} from 'react-router-dom';
import {UploadImage} from 'components/UI/Image';
import PropTypes from 'prop-types';
import {ShowIf} from 'components/utils';

class ProductBrief extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className='shopping-cart-container'>
        <div className='shopping-cart-left-content'>
          <div className='table-list-item-shopping'>
            <div className="table-list-item-body">
              <div className="item-shoppingg">
                <div className='item-shopping-img-wrap'>
                  <UploadImage type="PRODUCT" width="128" height="128" transform="crop" image={this.props.product.images[this.props.product.images.length -1]} />
                </div>
                <p className='item-shopping-name'>{this.props.product.name}</p>
                <div className='item-shopping-price-wrap'>
                  <p className='item-price'>{this.props.product.price}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductBrief;
