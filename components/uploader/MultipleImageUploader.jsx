import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {UploadImage} from 'components/UI/Image';

class MultipleImageUploader extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      images: this.props.images || []
    }
  }

  bindData(data) {
    const images = data.images || [];


    this.setState({
      images
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.images != this.state.images) {
      this.bindData(nextProps);
    }
  }

  handleFileUpload(e) {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      // file load end
      let data = new FormData();
      data.append(this.props.uploadFieldName, file);


      this.props.fnUpload({}, {
        data: data
      }).then(response => {
        let newImages = [
          ...this.state.images,
          response.data.result.files[this.props.uploadFieldName][0][this.props.responseFieldName]
        ]
        this.setState({
          images: newImages
        });

        this.props.onUploadComplete(newImages);
      }).catch(err => {
        console.log(err);
      });
    };
    reader.readAsDataURL(file);
  }

  removeImage(image) {
    let newImages = this.state.images.filter(item => item != image);

    this.setState({
      images: newImages
    })
  }

  render() {
    return (
      <div className="wrap-product-avata">
        <h3 className='wrap-product-title'>{this.props.heading}</h3>
        <div className='wrap-product-avata-upload'>
          <div className='wrap-input-upload'>
            <input className='product-upload-file' type='file' onChange={this.handleFileUpload.bind(this)}/>
            <span className='btn-post-file'><i className='fa fa-cloud-upload'/>{this.props.subHeading}</span>
          </div>
          <p className='upload-desc'><i className='fa fa-info-circle'/>{this.props.uploadGuide}</p>
        </div>
        <div className='wrap-image-result'>
          {
            this.state.images.map(image => {
              return (
                <div className="item-image">
                  <div className='wrap-img'>
                    <UploadImage className='img-result' width={128} height={128} type={this.props.type} image={image} transform='crop'/>
                  </div>
                  <button className='remove-img' onClick={this.removeImage.bind(this, image)}></button>
                </div>
              )
              return <UploadImage width={128} height={128} type={this.props.type} image={image}/>
            })
          }
        </div>
      </div>
    );
  }

}

MultipleImageUploader.propTypes = {
  fnUpload: PropTypes.func.isRequired,
  onUploadComplete: PropTypes.func,
  uploadFieldName: PropTypes.string,
  responseFieldName: PropTypes.string,
  type: PropTypes.oneOf(['PROFILE','BUSINESS', 'PRODUCT', 'PROMOTION', 'ARTICLE', 'COMPLAIN'])
}

MultipleImageUploader.defaultProps = {
  uploadFieldName: 'fileUpload',
  responseFieldName: 'name',
  onUploadComplete: function(response) {
    console.log(response)
  },
  type: 'BUSINESS',
  heading: 'Album Hình',
  subHeading: 'Upload hình',
  uploadGuide: 'Hỗ trợ định dạng .jpg, .png với dung lượng không lớn hơn 2MB.'
}

export default MultipleImageUploader;
