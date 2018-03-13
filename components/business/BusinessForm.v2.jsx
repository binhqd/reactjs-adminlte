import React from 'react';
import _BusinessForm from './_BusinessForm.scss';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Input, Textarea} from 'components/danangtrade-forms/common';
import {CategorySelectorInput} from 'components/danangtrade-forms';
import {SingleImageUploader} from 'components/uploader';
import {Businesses} from 'api';
import {toastr} from 'react-redux-toastr';
import {ShowIf} from 'components/utils';
import CONFIG from 'base/constants/config';

class BusinessForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.props.validators['formAddBusiness'] = [];

    this.state = {
      name: '',
      email: '',
      address: '',
      logo: '',
      geoLng: 0,
      geoLat: 0,
      taxCode: '',
      phone: '',
      description: '',
      countryId: 0,
      categoryIds: []
    }
  }

  bindData(data) {
    const {name, email, address, logo, geoLng, geoLat, taxCode, phone, description, countryId, categoryIds} = data;

    this.setState({
      name, email, address, logo, geoLng, geoLat, taxCode, phone, description, countryId, categoryIds
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

  submitForm(e) {
    //do something
    e.preventDefault();

    let params = {};

    if (this.validateSubmitForm()) {
      let { ...data } = this.state;

      if (this.props.data && typeof this.props.data.id != "undefined") {
        params = {id: this.props.data.id};
      } else {
        data['userId'] = this.props.auth.user.id;
      }

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

    } else {
      toastr.error('Lỗi!', 'Có lỗi xảy ra. Bạn vui lòng kiểm tra lại thông tin');
    }

    return false;
  }

  validateSubmitForm() {
    let pass = true;
    this.props.validators['formAddBusiness'].map(validator => {
      if (pass)
        pass = validator.validate();
      else
        validator.validate();
    });

    if (!pass) {
      toastr.error('Lỗi!', 'Có lỗi xảy ra. Bạn vui lòng kiểm tra lại thông tin');
      return false;
    }

    return pass;
  }

  onChange(name, e) {
    this.setState({
      [name]: e.target.value
    })
  }

  selectCategories(value) {
    let categoryIds = [];
    value.map(item => {
      categoryIds.push(item.value);
    });

    this.setState({
      categoryIds
    });
  }

  onUploadComplete(image) {
    this.setState({
      logo: image.name
    })
  }

  render() {
    return (
      <div className="register-business-box">
        <form onSubmit={this.submitForm.bind(this)}>
          <SingleImageUploader fnUpload={Businesses.actions.upload.request}
            onUploadComplete={this.onUploadComplete.bind(this)}
            image={this.state.logo}
          />
          <div className="register-box-body">
            <Input type="text" placeholder="Tên công ty..."
              className='has-feedback fg-custom'
              iconClassName='fa-user-o'
              value={this.state.name}
              required={true}
              onChange={this.onChange.bind(this, 'name')}
              bindValidator={this} channel="formAddBusiness"
              errorMessage="Tên doanh nghiệp không được để trống"
            />
            <Input type="email" placeholder="Email của doanh nghiệp..."
              className='has-feedback fg-custom'
              iconClassName='fa-at'
              value={this.state.email}
              onChange={this.onChange.bind(this, 'email')}
              required={true}
              bindValidator={this} channel="formAddBusiness"
              errorMessage="Bạn vui lòng cung cấp email"
            />
            <Input type="text" placeholder="Địa chỉ..."
              className='has-feedback fg-custom'
              value={this.state.address}
              onChange={this.onChange.bind(this, 'address')}
              iconClassName='fa-map-marker'
              required={true}
              bindValidator={this} channel="formAddBusiness"
              errorMessage="Bạn vui lòng cung cấp email"
            />
            <Input type="text" placeholder="Mã số thuế..."
              className='has-feedback fg-custom'
              value={this.state.taxCode}
              onChange={this.onChange.bind(this, 'taxCode')}
              iconClassName='fa-briefcase'
              required={true}
              bindValidator={this} channel="formAddBusiness"
              errorMessage="Bạn vui lòng cung cấp mã số thuế"
            />
            <Input type="text" placeholder="Số điện thoại..."
              className='has-feedback fg-custom'
              iconFontSet='fa'
              iconClassName='fa-phone'
              value={this.state.phone}
              onChange={this.onChange.bind(this, 'phone')}
              required={true}
              bindValidator={this} channel="formAddBusiness"
              errorMessage="Bạn vui lòng cung cấp số điện thoại"
            />
            {/* multiSelectBox */}
            <CategorySelectorInput label="Chọn lĩnh vực kinh doanh" data={this.state.categoryIds}
              onChange={this.selectCategories.bind(this)}
            />

            <Textarea type="text" placeholder="Mô tả..."
              className='fg-custom vitrade-textarea'
              iconFontSet='glyphicon'
              iconClassName='glyphicon-user'
              value={this.state.description}
              onChange={this.onChange.bind(this, 'description')}
              required={true}
              bindValidator={this} channel="formAddBusiness"
              errorMessage="Bạn vui lòng nhập mô tả ngắn"
            />

            <div>
              <ShowIf condition={this.props.data}>
                <button type="submit" className="btn btn-primary btn-block btn-flat btn-submit text-btn">CẬP NHẬT DOANH NGHIỆP</button>
              </ShowIf>
              <ShowIf condition={!this.props.data}>
                <button type="submit" className="btn btn-primary btn-block btn-flat btn-submit text-btn">THÊM DOANH NGHIỆP</button>
              </ShowIf>

            </div>
          </div>
        </form>
      </div>
    );
  }
}

BusinessForm.defaultProps = {
  validators: {}
}

const bindStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default withRouter(connect(bindStateToProps)(BusinessForm));
