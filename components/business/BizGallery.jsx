import React from 'react';
import BizImage from './BizImage.jsx';
import PropTypes from 'prop-types';

class BizGallery extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      images: this.props.images
    }
  }

  handleFileUpload(e) {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      // file load end
      let data = new FormData();
      data.append(this.props.fileField, file);

      this.props.uploadFunc({}, {
        data: data
      }).then(response => {
        let images = [
          ...this.state.images,
          response.data
        ];

        this.setState({
          images
        });

        this.props.onChange(this.state.images);
      }).catch(err => {
        console.log(err);
      });
    };
    reader.readAsDataURL(file);
  }

  handleRemove(selectedImage, data) {
    let images = [
      ...this.state.images
    ]

    images = images.filter(image => {
      return image != selectedImage
    });

    this.setState({
      images
    });

    this.props.onChange(images);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.images != nextProps.images) {
      this.setState({
        images: nextProps.images
      })
    }
  }

  render() {
    return (
      <div>
        <div className="row">
            <div className="col-lg-12">
                <h1 className="page-header">{this.props.label}</h1>
            </div>
            {
              this.state.images.map(image => {
                return <BizImage onRemove={this.handleRemove.bind(this, image)} data={image}/>
              })
            }


        </div>
        <div className="form-group">
          <label>Upload business images</label>
          <input type="file" className="form-control-file" aria-describedby="fileHelp" onChange={this.handleFileUpload.bind(this)}/>
        </div>
      </div>
    )
  }
}

BizGallery.propTypes = {
  label: PropTypes.string,
  uploadFunc: PropTypes.func.isRequired,
  fileField: PropTypes.string,
  images: PropTypes.array
}

BizGallery.defaultProps = {
  label: "Gallery",
  fileField: 'fileUpload',
  images: []
}

export default BizGallery;
