import React from 'react';
import {PropTypes} from 'prop-types';
import Promise from 'bluebird';
import {connect} from 'react-redux';
import {FAQs} from 'api';
import {withRouter} from 'react-router-dom';
import {RichTextarea} from 'components/danangtrade-forms/common';
import CONFIG from 'base/constants/config';
import {ShowIf} from 'components/utils'

class FAQForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.props.validators['formPostFAQ'] = [];

    this.state = {
      question: '',
      answer: '',
      initialContentData: ''
    }
  }

  bindData(data) {
    const {question, answer} = data;

    this.setState({
      question, answer, initialContentData: answer
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
        // this.props.dispatch(FAQs.actions.list());

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
            <label>Câu Hỏi</label>
            <input type="text" className="form-control" value={this.state.question} placeholder="Câu Hỏi" onChange={this.onInputChange.bind(this, 'question')}/>
          </div>

          <RichTextarea type="text" placeholder="Trả lời..."
            heading={
              () => <h3 className='wrap-product-des-title'>Trả lời</h3>
            }
            className='wrap-product-des'
            inputClassName='product-des-input'
            iconFontSet='glyphicon'
            iconClassName='glyphicon-user'
            value={this.state.initialContentData}
            onChange={this.onInputChange.bind(this, 'answer')}
            required={true}
            bindValidator={this} channel="formPostFAQ"
            errorMessage="Bạn vui lòng nhập nội dung"

          />

          <ShowIf condition={this.props.data}>
            <button type="submit" className="btn btn-primary btn-submit text-btn">Cập nhật hỏi đáp</button>
          </ShowIf>
          <ShowIf condition={!this.props.data}>
            <button type="submit" className="btn btn-primary btn-submit text-btn">Thêm hỏi đáp</button>
          </ShowIf>
          &nbsp;
          <button type='button' className="btn" onClick={() => this.props.history.push('/faqs')}>Thoát</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {

  }
}

FAQForm.propTypes = {
  fnSubmit: PropTypes.func.isRequired
}

FAQForm.defaultProps = {
  validators: {}
}

FAQForm.contextTypes = {
  router: React.PropTypes.object
};

export default withRouter(connect(mapStateToProps)(FAQForm));
