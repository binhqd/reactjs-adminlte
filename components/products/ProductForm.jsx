import React from 'react';
import {PropTypes} from 'prop-types';
import {Input, Textarea, RichTextarea} from 'components/danangtrade-forms/common';
import {SubCategorySelectorInput} from 'components/danangtrade-forms';
import {Checkbox} from 'components/partials/checkbox';
import {Link, withRouter} from 'react-router-dom';
import style from './_ProductForm.scss';
import {MultipleImageUploader} from 'components/uploader';
import Promise from 'bluebird';
import {Products} from 'api';
import {toastr} from 'react-redux-toastr';
import {connect} from 'react-redux';
import {ShowIf} from 'components/utils';

class ProductForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.props.validators['formPostProduct'] = [];

    this.state = {
      name: 'Trà xanh',
      code: '',
      price: this.props.defaultPrice,
      description: 'Trà xanh chất lượng tuyệt hảo. Được trồng trên cao nguyên',
      introduction: 'Trà xanh có rất nhiều hoạt tính dược học tác dụng chống các bệnh như: ung thư, các bệnh về tim mạch và bệnh tiểu đường.Tập quán uống trà xanh bắt nguồn từ Trung Quốc vào khoảng 800 năm sau Công nguyên. Trà xanh lưu truyền vào nước ta không rõ từ năm nào nhưng được coi là một thứ nước uống dân dã, phổ biến trong nhân dân.',
      images: [],
      categoryIds: [],
      businessId: null,
      customPrice: true,
      initialIntroductionData: ''
    }
  }

  bindData(data) {
    const {name, code, price, description, images, categoryIds, businessId, customPrice, introduction} = data;

    this.setState({
      name, code, price, description, images, categoryIds, businessId, customPrice, introduction, initialIntroductionData: introduction
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
    if (name == 'typePrice') {
      if (this.state.typePrice == 'price') {
        this.setState({
          [name]: 'contact'
        })
      } else {
        this.setState({
          [name]: 'price'
        })
      }
    } else {
      this.setState({
        [name]: e.target.value
      })
    }
  }

  onUploadComplete(images) {
    this.setState({
      images
    });
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
      let { customPrice, ...data } = this.state;

      if (this.props.data && typeof this.props.data.id != "undefined") {
        params = {id: this.props.data.id};
      } else {
        data.businessId = this.props.bizID;
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
    }


    return false;
  }

  validateSubmitForm() {
    let pass = true;
    this.props.validators['formPostProduct'].map(validator => {
      if (pass)
        pass = validator.validate();
      else
        validator.validate();
    });

    if (this.state.images.length == 0) {
      toastr.error('Lỗi!', 'Bạn vui lòng cung cấp ít nhất 1 hình ảnh cho sản phẩm');
      return false;
    }

    if (this.state.categoryIds.length == 0) {
      toastr.error('Lỗi!', 'Bạn vui lòng chọn ít nhất một nhóm sản phẩm cho sản phẩm hiện tại');
      return false;
    }

    if (!this.state.price.trim()) {
      toastr.error('Lỗi!', 'Bạn vui lòng nhập thông tin về giá');
      return false;
    }

    return pass;
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

  selectPrice(type) {
    if (type == 'custom') {
      this.setState({
        customPrice: true
      });
    } else {
      this.setState({
        customPrice: false
      });

      this.onChange('price', this.props.defaultPrice)
    }
  }

  render() {
    return (
      <section className="add-product">
        <form onSubmit={this.submitForm.bind(this)}>
          <div className='add-product-wrap-form'>
            <div className='add-product-left-content'>
              <Input type="text" placeholder="Tên sản phẩm..."
                className='has-feedback fg-custom'
                iconFontSet='vtd-product'
                iconClassName='input-product-name-icon'
                value={this.state.name}
                required={"Tên sản phẩm không được để trống"}
                onChange={this.onChange.bind(this, 'name')}
                bindValidator={this} channel="formPostProduct"
                errorMessage="Tên sản phẩm không được để trống"
              />
              <MultipleImageUploader fnUpload={Products.actions.upload.request}
                type='PRODUCT'
                onUploadComplete={this.onUploadComplete.bind(this)}
                images={this.state.images}
              />

              <Input type="text" placeholder="Mã sản phẩm..."
                className='has-feedback fg-custom'
                iconFontSet='vtd-product'
                iconClassName='input-product-name-icon'
                value={this.state.code}
                onChange={this.onChange.bind(this, 'code')}
              />

              <Textarea type="text" placeholder="Mô tả..."
                heading={
                  () => <h3 className='wrap-product-des-title'>Mô tả ngắn <span className='des-title-des'><i className='fa fa-info-circle'/>Giới hạn trong 100 chữ.</span></h3>
                }
                className='wrap-product-des'
                inputClassName='product-des-input'
                iconFontSet='glyphicon'
                iconClassName='glyphicon-user'
                value={this.state.description}
                onChange={this.onChange.bind(this, 'description')}
                required={true}
                bindValidator={this} channel="formPostProduct"
                errorMessage="Bạn vui lòng nhập mô tả ngắn"
              />

              <RichTextarea type="text" placeholder="Mô tả..."
                heading={
                  () => <h3 className='wrap-product-des-title'>Giới thiệu về sản phẩm</h3>
                }
                className='wrap-product-des'
                inputClassName='product-des-input'
                iconFontSet='glyphicon'
                iconClassName='glyphicon-user'
                value={this.state.initialIntroductionData}
                onChange={this.onChange.bind(this, 'introduction')}
                required={true}
                bindValidator={this} channel="formPostProduct"
                errorMessage="Bạn vui lòng nhập mô tả ngắn"
              />
              <SubCategorySelectorInput label="Chọn nhóm sản phẩm"
                onChange={this.selectCategories.bind(this)}
                data={this.state.categoryIds}
              />
            </div>

            <div className='add-product-right-content'>

              <div className='wrap-radio-price'>
                <h3 className='wrap-radio-price-title'>Giá sản phẩm</h3>
                <div className='wrap-input-radio-price'>
                  <input className='input-radio-price' id="customPrice" type='radio' onChange={this.selectPrice.bind(this, 'custom')} checked={this.state.customPrice} name='product-price'/>
                  <label className='label-radio-price' htmlFor="customPrice">Nhập giá (VNĐ)</label>
                </div>
                <ShowIf condition={this.state.customPrice}>
                  <div className='content-justify wrap-price'>
                    <input className='input-price' onChange={this.onChange.bind(this, 'price')}/>
                  </div>
                </ShowIf>

                <div className='wrap-input-radio-price'>
                  <input className='input-radio-price' type='radio' id="contactPrice" onChange={this.selectPrice.bind(this, 'contact')} checked={!this.state.customPrice} name='product-price'/>
                  <label className='label-radio-price' htmlFor="contactPrice">Yêu cầu liên hệ</label>
                </div>
                {
                  this.props.edit ?
                    (
                      <div className='add-product-btn-wrap'>
                        <button className='add-product-btn'>Cập nhật sản phẩm</button>
                      </div>
                    ):(
                      <div className='add-product-btn-wrap'>
                        <button className='add-product-btn'>Đăng sản phẩm</button>
                      </div>
                    )
                }
              </div>

              {
                this.props.edit ? (
                  <button className='btn-delete-product'><i className='fa fa-trash'/>Xóa sản phẩm</button>
                ) : null
              }
            </div>
          </div>
        </form>
      </section>
    );
  }
}

ProductForm.PropTypes = {
  bizID: PropTypes.string.isRequired
}

ProductForm.defaultProps = {
  validators: {},
  defaultPrice: 'Giá tham khảo'
}

const bindStateToProps = state => {
  return {
    auth: state.auth,
    businesses: state.myBusinesses
  }
}

export default withRouter(connect(bindStateToProps)(ProductForm));
