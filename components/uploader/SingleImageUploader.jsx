import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {UploadImage} from 'components/UI/Image';
import style from './style.scss';
import {ShowIf} from 'components/utils';

class SingleImageUploader extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      image: this.props.image
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
        this.setState({
          image: response.data.result.files[this.props.uploadFieldName][0][this.props.responseFieldName]
        });

        this.props.onUploadComplete(response.data.result.files[this.props.uploadFieldName][0]);
      }).catch(err => {
        console.log(err);
      });
    };
    reader.readAsDataURL(file);
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.image != "undefined" && nextProps.image != this.state.image) {
      this.setState({
        image: nextProps.image
      })
    }
  }

  removeImage() {
    let callAction = () => {
      this.props.onRemoveImage({
        image: this.state.image
      });

      this.setState({
        image: ''
      });
    }

    if (this.props.confirmRemove && !confirm("Bạn có thực sự muốn xóa hình này")) {
      return;
    }

    callAction();
  }

  render() {
    return (
      <div className="form-group upload-img-container">
        {
          (() => {
            let Img = null;
            if (this.state.image) {
              Img = <UploadImage width={128} height={128} type={this.props.type} image={this.state.image} transform='crop'/>
            } else {
              Img = <img className="media-object" src={require('assets/images/placeholder-128.jpg')} alt="..." width="128" height="128"/>;
            }

            return (
              <div className='upload-img-border'>
                <div className='upload-img-wrap'>
                  {Img}
                </div>
                <ShowIf condition={this.state.image}>
                  <a href='javascript:void(0)' className='upload-img-clear-btn' onClick={this.removeImage.bind(this)}>Remove</a>
                </ShowIf>
              </div>
            )
          })()
        }
        <div className='upload-img-wrap-desc'>
          <label className='upload-img-desc'>{this.props.title}</label>
          <div className="wrap-input-upload">
            <input type="file" className="form-control-file" aria-describedby="fileHelp" onChange={this.handleFileUpload.bind(this)}/>
            <span className="btn-post-file"><i className="fa fa-cloud-upload"></i>Upload hình</span>
          </div>
          <p className="upload-desc">
            <i className="fa fa-info-circle"></i>
            Hỗ trợ định dạng .jpg, .png với dung lượng không lớn hơn 2MB.
          </p>
        </div>
      </div>
    );
  }

}

SingleImageUploader.propTypes = {
  fnUpload: PropTypes.func.isRequired,
  onUploadComplete: PropTypes.func,
  uploadFieldName: PropTypes.string,
  responseFieldName: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.oneOf(['USER','BUSINESS', 'PRODUCT', 'PROMOTION', 'ARTICLE', 'COMPLAIN', 'CATEGORY']),
  image: PropTypes.string,
  confirmRemove: PropTypes.bool
}

SingleImageUploader.defaultProps = {
  uploadFieldName: 'fileUpload',
  title: 'Upload hình',
  responseFieldName: 'name',
  onUploadComplete: function(response) {
    console.log(response)
  },
  type: 'BUSINESS',
  confirmRemove: false
}

export default SingleImageUploader;
