import React from 'react';
import {PropTypes} from 'prop-types';
import {RichTextarea} from 'components/danangtrade-forms/common';
import {Checkbox} from 'components/partials/checkbox';
import {Link, withRouter} from 'react-router-dom';
import style from './_SubscriptionMailContentEditor.scss';
import Promise from 'bluebird';
import {toastr} from 'react-redux-toastr';

class SubscriptionMailContentEditor extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.props.validators['formPostProduct'] = [];

    this.state = {
      content: ''
    }
  }

  bindData(data) {
    const {content} = data;

    this.setState({
      content
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

  onChange(name, e) {
    let val = e.target ? e.target.value : e;
    this.setState({
      [name]: val
    })
  }

  submitForm(e) {
    //do something
    e.preventDefault();

    let params = {};

    if (this.validateSubmitForm()) {
      let { ...data } = this.state;

      return this.props.dispatch(this.props.fnSubmit(params, {
        data
      })).then(response => {
        if (typeof this.props.cb == 'function') {
          this.props.cb(response);
        }

        return Promise.resolve(response)

      }).catch(err => {
        Promise.reject(err);
      });
    }


    return false;
  }

  validateSubmitForm() {
    let pass = true;


    return pass;
  }

  render() {
    return (
      <section className="add-product">
        <form onSubmit={this.submitForm.bind(this)}>
          <div className='add-product-wrap-form'>
            <div className='add-product-left-content'>

              <RichTextarea type="text" placeholder="Mô tả..."
                heading={
                  () => <h3 className='wrap-product-des-title'>Nội dung email</h3>
                }
                className='wrap-product-des'
                inputClassName='product-des-input'
                iconFontSet='glyphicon'
                iconClassName='glyphicon-user'
                value={this.state.content}
                onChange={this.onChange.bind(this, 'introduction')}
                required={true}
                bindValidator={this} channel="formPostProduct"
                errorMessage="Bạn vui lòng nhập mô tả ngắn"
              />
            </div>

            <div className='add-product-right-content'>

              <div className='wrap-radio-price'>
                <div className='add-product-btn-wrap'>
                  <button className='add-product-btn'>Cập nhật nội dung</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    );
  }
}

SubscriptionMailContentEditor.defaultProps = {
  validators: {}
}

export default withRouter(SubscriptionMailContentEditor);
