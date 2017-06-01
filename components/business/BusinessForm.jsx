import React from 'react';
import {PropTypes} from 'prop-types';
import Promise from 'bluebird';
import {connect} from 'react-redux';
import {Categories, Businesses} from 'api';
import {CategoryParentList} from 'components/category';

class BusinessForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      description: '',
      address: '',
      logo: null
    }
  }

  onInputChange(name, e) {
    this.setState({
      [name]: e.target.value
    })
  }

  submitForm(e) {
    e.preventDefault();
    let params = {};

    let data = new FormData();

    data.append("name", this.state.name);
    data.append("description", this.state.description);
    data.append("address", this.state.address);


    if (this.state.logo != null) {
      data.append('fileUpload', this.state.logo);
    }

    if (typeof this.props.businessId != "undefined") {
      params = {id: this.props.businessId}
    }
    return this.props.dispatch(this.props.fnSubmit(params, {
      data: data
    }))
      .then(response => {
        // reload list
        this.props.dispatch(Businesses.actions.list());

        if (typeof this.props.cb == 'function') {
          this.props.cb(response);
        }

        return Promise.resolve(response)
      })
      .catch(err => {
        // console.log(err);
        Promise.reject(err);
      })
  }

  componentDidMount() {
    if (this.props.categoriesAsTree.length == 0) {
      this.props.dispatch(Categories.actions.list());
    }

    // get business info
    this.props.dispatch(Businesses.actions.get({id: this.props.businessId})).then(res => {
      this.setState({
        name: res.data.name,
        description: res.data.description,
        address: res.data.address
      })
    })
  }

  componentWillReceiveProps(nextProps) {

  }

  handleFileUpload(e) {
    let reader = new FileReader();
    let file = e.target.files[0];
    this.setState({
      logo: file
    })

    //reader.readAsDataURL(file);
  }

  render() {

    return (
      <form>
        <div className="form-group">
          <label htmlFor="formCatName">Tên doanh nghiệp</label>
          <input type="text" className="form-control" value={this.state.name} placeholder="Tên" onChange={this.onInputChange.bind(this, 'name')}/>
        </div>
        <div className="form-group">
          <label htmlFor="formCatDescription">Mô tả</label>
          <textarea className="form-control" placeholder="Mô tả" onChange={this.onInputChange.bind(this, 'description')}
            value={this.state.description}
            />
        </div>
        <div className="form-group">
          <label htmlFor="formCatName">Địa chỉ</label>
          <input type="text" className="form-control" value={this.state.address} placeholder="Địa chỉ" onChange={this.onInputChange.bind(this, 'address')}/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Danh mục</label>
            <div className="dropdown">
              <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                Chọn danh mục
                <span className="caret"></span>
              </button>
              <CategoryParentList data={this.props.categoriesAsTree}/>
            </div>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputFile">Logo</label>
          <input type="file" className="form-control-file" aria-describedby="fileHelp" onChange={this.handleFileUpload.bind(this)}/>
          <small id="fileHelp" className="form-text text-muted">This is some placeholder block-level help text for the above input. It''s a bit lighter and easily wraps to a new line.</small>
        </div>

        <button type="submit" className="btn btn-primary" onClick={this.submitForm.bind(this)}>{
            typeof this.props.businessId == "undefined" ?
            'Thêm doanh nghiệp'
            : 'Cập nhật doanh nghiệp'
          }</button>
      </form>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    categoriesAsTree: state.categoriesAsTree
  }
}

BusinessForm.propTypes = {
  fnSubmit: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(BusinessForm);
