import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import CONFIG from 'base/constants/config';

class CDNImage extends Component {

  render() {
    let src = `${this.props.host}${this.props.uri}`;
    let { alt, className, style } = this.props;
    let otherProps = { alt, className, style };

    return (
      <img width={this.props.width} height={this.props.height} src={src} {...otherProps}/>
    );
  }
}

CDNImage.propTypes = {
  uri: PropTypes.string.isRequired
}

CDNImage.defaultProps = {
  host: CONFIG.UploadImageURL
}

export default CDNImage;
