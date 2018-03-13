import React from 'react';
import {PropTypes} from 'prop-types';
import Promise from 'bluebird';
import {connect} from 'react-redux';
import {CategoryParentList} from 'components/category';
import {Categories} from 'api';
import CONFIG from 'base/constants/config';
import {SingleImageUploader} from 'components/uploader';
import {withRouter} from 'react-router-dom';

class CategoryForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      description: '',
      parentId: null,
      logo: null,
      smallIcon: '',
      largeIcon: ''
    }
  }

  onInputChange(name, e) {
    this.setState({
      [name]: e.target.value
    })
  }

  submitForm(e) {

    let params = {};

    let data = {
      name: this.state.name,
      description: this.state.description,
      parentId: this.state.parentId,
      logo: this.state.logo,
      smallIcon: this.state.smallIcon,
      largeIcon: this.state.largeIcon
    }

    if (typeof this.props.categoryId != "undefined") {
      params = {id: this.props.categoryId};

      // prevent self parenting
      if (this.props.categoryId == data.parentId) {
        delete data.parentId;
      }
    }

    return this.props.dispatch(this.props.fnSubmit(params, {
      data
    }))
      .then(response => {
        // reload list
        this.props.dispatch(Categories.actions.list());

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
    if (this.props.categoriesAsTree.length == 0) {
      this.props.dispatch(Categories.actions.list());
    }

    if (this.props.categoryHash && this.props.categoryHash[this.props.categoryId]) {
      let category = this.props.categoryHash[this.props.categoryId];
      this.setState({...category});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.categoryHash && nextProps.categoryHash[this.props.categoryId]) {
      let category = nextProps.categoryHash[this.props.categoryId];

      this.setState({...category});
    }
  }

  selectParent(id) {
    this.setState({
      parentId: id
    });
  }

  removeLogo() {
    this.setState({
      logo: ''
    })
  }

  onUploadComplete(fieldName, image) {
    this.setState({
      [fieldName]: image.name
    })
  }

  render() {
    let parentCategory = this.props.categoryHash[this.state.parentId];
    return (
      <div>
        <div className="form-group">
          <label htmlFor="formCatName">Tên danh mục</label>
          <input type="text" className="form-control" value={this.state.name} placeholder="Tên" onChange={this.onInputChange.bind(this, 'name')}/>
        </div>

        <div className="form-group">
          <label htmlFor="formCatName">Classname của icon nhỏ:</label>
          <input type="text" className="form-control" value={this.state.smallIcon} placeholder="Icon nhỏ" onChange={this.onInputChange.bind(this, 'smallIcon')}/>
        </div>

        <div className="form-group">
          <label htmlFor="formCatName">Classname của icon lớn:</label>
          <input type="text" className="form-control" value={this.state.largeIcon} placeholder="Icon lớn" onChange={this.onInputChange.bind(this, 'largeIcon')}/>
        </div>

        <div className="form-group">
          <label htmlFor="formCatDescription">Mô tả</label>
          <textarea className="form-control" placeholder="Mô tả" onChange={this.onInputChange.bind(this, 'description')}
            value={this.state.description}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Chọn danh mục cha:</label>
          <CategoryParentList parentCategory={this.state.parentId} onChange={this.selectParent.bind(this)}/>
        </div>


        <button type="submit" className="btn btn-primary" onClick={this.submitForm.bind(this)}>{
          typeof this.props.categoryId == "undefined" ?
            'Thêm mới'
          : 'Cập nhật'
        }</button>

        <button type='button' className="btn" onClick={() => this.props.history.push('/categories')}>Thoát</button>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    categoriesAsTree: state.categoriesAsTree,
    categoryHash: state.categoryHash
  }
}

CategoryForm.propTypes = {
  fnSubmit: PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToProps)(CategoryForm));
