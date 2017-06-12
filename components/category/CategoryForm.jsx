import React from 'react';
import {PropTypes} from 'prop-types';
import Promise from 'bluebird';
import {connect} from 'react-redux';
import {CategoryParentList} from 'components/category';
import {Categories} from 'api';

class CategoryForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      description: '',
      parent_id: null
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
      description: this.state.description
    }

    if (typeof this.props.categoryId != "undefined") {
      params = {id: this.props.categoryId}
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
      console.log(category);
      this.setState({...category});
    }
  }

  handleFileUpload(e) {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        avatar: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  selectParent(id) {
    console.log(id);
  }

  render() {

    return (
      <div>
        <div className="form-group">
          <label htmlFor="formCatName">Category Name</label>
          <input type="text" className="form-control" value={this.state.name} placeholder="Name" onChange={this.onInputChange.bind(this, 'name')}/>
        </div>
        <div className="form-group">
          <label htmlFor="formCatDescription">Description</label>
          <textarea className="form-control" placeholder="Description" onChange={this.onInputChange.bind(this, 'description')}
            value={this.state.description}
            />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Select Parent</label>
            <div className="dropdown">
              <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                Dropdown
                <span className="caret"></span>
              </button>
              <CategoryParentList data={this.props.categoriesAsTree} onClick={this.selectParent.bind(this)}/>
            </div>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputFile">Category Logo</label>
          <input ref='uploadFile' type="file" className="form-control-file" aria-describedby="fileHelp" onChange={this.handleFileUpload.bind(this)}/>
          <small id="fileHelp" className="form-text text-muted">This is some placeholder block-level help text for the above input. It''s a bit lighter and easily wraps to a new line.</small>
        </div>

        <button type="submit" className="btn btn-primary" onClick={this.submitForm.bind(this)}>{
            typeof this.props.categoryId == "undefined" ?
            'Add Category'
            : 'Update Category'
          }</button>
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

export default connect(mapStateToProps)(CategoryForm);
