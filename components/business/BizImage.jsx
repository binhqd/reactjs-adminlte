import React from 'react';
import PropTypes from 'prop-types';
import CONFIG from 'base/constants/config';

class BizImage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      ...this.props.data
    }
  }

  onRemove(e) {
    this.props.onRemove(this.state);
  }

  render() {
    let img = null;
    if (this.state.name) {
      img = `${CONFIG.staticURL}/${this.state.container}/${this.state.name}`;
    }

    return (
      <div className="col-lg-3 col-md-4 col-xs-6 thumb btn-remove-thumbnail" style={{position: 'relative'}}>
        <div style={{position: 'absolute', right: 5, top: 5, width: 32, height: 32}}>
          <a href='javascript:void(0)' onClick={this.onRemove.bind(this)}>
            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
          </a>
        </div>
          <a className="thumbnail" href="#">
            <img className="img-responsive" src={img}/>
          </a>
      </div>
    )
  }
}
BizImage.propTypes = {
  onRemove: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

BizImage.defaultProps = {

}

export default BizImage;
