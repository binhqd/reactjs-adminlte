import React from 'react';
import {PropTypes} from 'prop-types';
import Promise from 'bluebird';
import {connect} from 'react-redux';
import {Categories, Promotions} from 'api';
import {CategoryParentList} from 'components/category';
import {browserHistory} from 'react-router';
import CONFIG from 'base/constants/config';

class PromotionForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      title: '',
      description: '',
      business_id: '',
      category_id: '',
      banner: '',
      expiry_date: new Date()
    }
  }

  onInputChange(name, e) {
    this.setState({
      [name]: typeof e.target != "undefined" ? e.target.value : e
    })
  }

  submitForm(e) {
    let params = {};

    let data = {
      ...this.state
    }

    if (typeof this.props.promotionId != "undefined") {
      params = {id: this.props.promotionId};
    }

    return this.props.dispatch(this.props.fnSubmit(params, {
      data
    }))
      .then(response => {
        // reload list
        this.props.dispatch(Promotions.actions.list());

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
    // get promotion info
    if (this.props.promotionId) {
      this.props.dispatch(Promotions.actions.get({id: this.props.promotionId})).then(res => {
        this.setState({
          ...res.data
        });
      })
    }

  }

  handleFileUpload(e) {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      // file load end
      let data = new FormData();
      data.append('fileUpload', file);

      this.props.dispatch(
        Promotions.actions.uploadBanner({}, {
          data: data
        })
      ).then(response => {
        this.setState({
          banner: response.data
        })
      }).catch(err => {
        console.log(err);
      });
    };
    reader.readAsDataURL(file);
  }

  render() {

    return (
      <div>
        <div className="form-group">
          <label>Tiêu đề</label>
          <input type="text" className="form-control" value={this.state.title} placeholder="Tiêu đề" onChange={this.onInputChange.bind(this, 'title')}/>
        </div>
        <div className="form-group">
          <label>Mô tả</label>
          <textarea className="form-control" placeholder="Mô tả" onChange={this.onInputChange.bind(this, 'description')}
            value={this.state.description}
            />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Chọn lĩnh vực/danh mục:</label>
          <CategoryParentList showAll={true} parentCategory={this.state.category_id} onChange={this.onInputChange.bind(this, 'category_id')}/>
        </div>
        <div className="form-group">
          {
            (() => {
              let img = require('assets/images/placeholder-128.jpg');

              if (this.state.banner) {
                img = `${CONFIG.staticURL}/promotion-banners/${this.state.banner.name}`;
              }

              return (
                <div>
                  <img className="media-object" src={img} alt="..." width="128" height="128"/>
                </div>
              )
            })()
          }
          <label htmlFor="exampleInputFile">Tải lên banner khuyến mãi</label>
          <input type="file" className="form-control-file" aria-describedby="fileHelp" onChange={this.handleFileUpload.bind(this)}/>

        </div>

        <button type="submit" className="btn btn-primary" onClick={this.submitForm.bind(this)}>{
            typeof this.props.promotionId == "undefined" ?
            'Thêm tin khuyến mãi'
            : 'Cập nhật tin khuyến mãi'
          }</button>

        <button type='button' className="btn" onClick={() => browserHistory.push('/promotions')}>Thoát</button>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    categoriesAsTree: state.categoriesAsTree
  }
}

PromotionForm.propTypes = {
  fnSubmit: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(PromotionForm);
