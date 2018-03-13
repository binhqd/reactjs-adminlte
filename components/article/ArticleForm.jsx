import React from 'react';
import {PropTypes} from 'prop-types';
import Promise from 'bluebird';
import {connect} from 'react-redux';
import {Articles} from 'api';
import {withRouter} from 'react-router-dom';
import {SingleImageUploader} from 'components/uploader';
import {RichTextarea} from 'components/danangtrade-forms/common';
import {ArticleCategorySelectorInput} from 'components/danangtrade-forms';
import CONFIG from 'base/constants/config';
import {ShowIf} from 'components/utils'

class ArticleForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.props.validators['formPostArticle'] = [];

    this.state = {
      title: "",
      description: "",
      content: "",
      image: '',
      categoryId: '',
      initialContentData: ''
    }
  }

  bindData(data) {
    const {title, description, content, categoryId, image} = data;

    this.setState({
      title, description, content, categoryId, image, initialContentData: content
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

  onInputChange(name, e) {
    let value = e.target ? e.target.value : e;
    this.setState({
      [name]: value
    })
  }

  submitForm(e) {
    e.preventDefault();

    let params = {};

    let {initialContentData, ...data} = this.state;

    if (this.props.data && typeof this.props.data.id != "undefined") {
      params = {id: this.props.data.id};
    }

    return this.props.dispatch(this.props.fnSubmit(params, {
      data
    }))
      .then(response => {
        // reload list
        // this.props.dispatch(Articles.actions.list());

        if (typeof this.props.cb == 'function') {
          this.props.cb(response);
        }

        return Promise.resolve(response)
      })
      .catch(err => {
        Promise.reject(err);
      })
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

  selectCategory(catID) {
    this.setState({
      categoryId: catID
    })
  }

  render() {
    return (
      <div  className="add-product">
        <form onSubmit={this.submitForm.bind(this)}>
          <div className="form-group add-product-wrap-form">
            <label>Tiêu đề</label>
            <input type="text" className="form-control" value={this.state.title} placeholder="Tiêu đề" onChange={this.onInputChange.bind(this, 'title')}/>
          </div>
          <SingleImageUploader fnUpload={Articles.actions.upload.request}
            onUploadComplete={this.onUploadComplete.bind(this)}
            image={this.state.image}
            onRemoveImage={this.onRemoveImage.bind(this)}
            type='ARTICLE'
          />
          <div className="form-group">
            <label>Mô tả</label>
            <textarea className="form-control" placeholder="Mô tả" onChange={this.onInputChange.bind(this, 'description')}
              value={this.state.description}
            />
          </div>

          <RichTextarea type="text" placeholder="Nội dung..."
            heading={
              () => <h3 className='wrap-product-des-title'>Nội dung</h3>
            }
            className='wrap-product-des'
            inputClassName='product-des-input'
            iconFontSet='glyphicon'
            iconClassName='glyphicon-user'
            value={this.state.initialContentData}
            onChange={this.onInputChange.bind(this, 'content')}
            required={true}
            bindValidator={this} channel="formPostArticle"
            errorMessage="Bạn vui lòng nhập nội dung"
            uploadCallback={
              (file) => {
                let data = new FormData();
                data.append('fileUpload', file);
                return Articles.actions.upload.request({}, {
                  data
                }).then(response => {
                  let link = `${CONFIG.UploadImageURL}/resize/800x600/articles/download/${response.data.result.files.fileUpload[0].name}`;
                  return Promise.resolve({
                    data: {
                      link
                    }
                  })
                })
              }
            }
          />

          <ArticleCategorySelectorInput label="Chọn danh mục tin" data={this.state.categoryId}
            onChange={this.selectCategory.bind(this)}
          />

          <ShowIf condition={this.props.data}>
            <button type="submit" className="btn btn-primary btn-submit text-btn">Cập nhật tin</button>
          </ShowIf>
          <ShowIf condition={!this.props.data}>
            <button type="submit" className="btn btn-primary btn-submit text-btn">Thêm tin</button>
          </ShowIf>
          &nbsp;
          <button type='button' className="btn" onClick={() => this.props.history.push('/articles')}>Thoát</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {

  }
}

ArticleForm.propTypes = {
  fnSubmit: PropTypes.func.isRequired
}

ArticleForm.defaultProps = {
  validators: {}
}

ArticleForm.contextTypes = {
  router: React.PropTypes.object
};

export default withRouter(connect(mapStateToProps)(ArticleForm));
