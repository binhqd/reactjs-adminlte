/**
Usage example: <UploadImage width={200} height={200} type='PRODUCT' image='6acfdeb2-6f5b-4c58-bdc5-39ab4d26a926.jpg'/>
available type: PRODUCT, USER, BUSINESS
**/

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import CDNImage from './CDNImage.jsx';

class UploadImage extends Component {

  render() {
    let uri = `/${this.props.transform == 'resize' ? 'resize' : 'crop'}/${this.props.width}x${this.props.height}`;

    switch (this.props.type) {
      case 'PROMOTION':
        uri = `${uri}/promotions/download/${this.props.image}`;
        break;
      case 'USER':
        uri = `${uri}/users/download/${this.props.image}`;
        break;
      case 'COMPLAIN':
        uri = `${uri}/complains/download/${this.props.image}`;
        break;
      case 'ARTICLE':
        uri = `${uri}/articles/download/${this.props.image}`;
        break;
      case 'BUSINESS':
        uri = `${uri}/businesses/download/${this.props.image}`;
        break;
      case 'CATEGORY':
        uri = `${uri}/categories/download/${this.props.image}`;
        break;

      case 'PRODUCT':
      default:
        uri = `${uri}/products/download/${this.props.image}`;
    }

    let { alt, className, style } = this.props;
    let otherProps = { alt, className, style };

    return (
      <CDNImage width={this.props.width} height={this.props.height} transform={this.props.transform} uri={uri} {...otherProps}/>
    );
  }

}

UploadImage.propTypes = {
  transform: PropTypes.oneOf(['resize','crop']),
  type: PropTypes.oneOf(['PROFILE','BUSINESS', 'PRODUCT', 'PROMOTION', 'ARTICLE', 'COMPLAIN', 'CATEGORY']),
  image: PropTypes.string.isRequired
}

UploadImage.defaultProps = {
  transform: 'resize'
}

export default UploadImage;
