import React from 'react';
import {PropTypes} from 'prop-types';
import Promise from 'bluebird';
import {connect} from 'react-redux';
import {Promotions} from 'api';
import {SingleImageUploader} from 'components/uploader';
import CONFIG from 'base/constants/config';
import {ShowIf} from 'components/utils'

class BusinessForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      "title": "",
      "description": "",
      "image": "",
      "link": ""
    }
  }

  bindData(data) {
    const {title, description, image, link} = data;

    this.setState({
      title, description, image, link
    })
  }

  onInputChange(name, e) {
    let value = e.target ? e.target.value : e;
    this.setState({
      [name]: value
    })
  }

  submitForm(e) {
    e.preventDefault();

    let params = {};

    let data = {
      ...this.state
    }

    if (this.props.data && typeof this.props.data.id != "undefined") {
      params = {id: this.props.data.id};
    }

    return this.props.dispatch(this.props.fnSubmit(params, {
      data
    }))
      .then(response => {
        // reload list
        // this.props.dispatch(Promotions.actions.list());

        if (typeof this.props.cb == 'function') {
          this.props.cb(response);
        }

        return Promise.resolve(response)
      })
      .catch(err => {
        Promise.reject(err);
      })
  }

  componentDidMount() {
    if (this.props.data) {
      this.bindData(this.props.data)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data != this.state.data) {
      this.bindData(nextProps.data);
    }
  }

  onUploadComplete(image) {
    this.setState({
      image: image.name
    })
  }

  onRemoveImage() {
    this.setState({
      image: ''
    })
  }

  render() {

    return (
      <div>
        <form onSubmit={this.submitForm.bind(this)}>
          <div className="form-group">
            <label>Tiêu đề</label>
            <input type="text" className="form-control" value={this.state.title} placeholder="Tiêu đề" onChange={this.onInputChange.bind(this, 'title')}/>
          </div>
          <SingleImageUploader fnUpload={Promotions.actions.upload.request}
            onUploadComplete={this.onUploadComplete.bind(this)}
            image={this.state.image}
            onRemoveImage={this.onRemoveImage.bind(this)}
            type='PROMOTION'
          />
          <div className="form-group">
            <label>Mô tả</label>
            <textarea className="form-control" placeholder="Mô tả" onChange={this.onInputChange.bind(this, 'description')}
              value={this.state.description}
            />
          </div>

          <div className="form-group">
            <label>Liên kết</label>
            <input type="text" className="form-control" value={this.state.link} placeholder="http://" onChange={this.onInputChange.bind(this, 'link')}/>
          </div>

          <ShowIf condition={this.props.data}>
            <button type="submit" className="btn btn-primary btn-submit text-btn">Cập nhật tin</button>
          </ShowIf>
          <ShowIf condition={!this.props.data}>
            <button type="submit" className="btn btn-primary btn-submit text-btn">Thêm tin khuyến mãi</button>
          </ShowIf>

          <button type='button' className="btn" onClick={() => this.props.history.push('/promotions')}>Thoát</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {

  }
}

BusinessForm.propTypes = {
  fnSubmit: PropTypes.func.isRequired
}

BusinessForm.contextTypes = {
  router: React.PropTypes.object
};

export default connect(mapStateToProps)(BusinessForm);
