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
    e.preventDefault();

    return this.props.dispatch(this.props.fnSubmit({}, {
      data: JSON.stringify(this.state)
    }))
      .then(response => {
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
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="formCatName">Category Name</label>
          <input type="text" className="form-control" placeholder="Name" onChange={this.onInputChange.bind(this, 'name')}/>
        </div>
        <div className="form-group">
          <label htmlFor="formCatDescription">Description</label>
          <textarea className="form-control" placeholder="Description" onChange={this.onInputChange.bind(this, 'description')}/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Select Parent</label>
            <div className="dropdown">
              <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                Dropdown
                <span className="caret"></span>
              </button>
              <CategoryParentList data={this.props.categoriesAsTree}/>
            </div>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputFile">Category Logo</label>
          <input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp"/>
          <small id="fileHelp" className="form-text text-muted">This is some placeholder block-level help text for the above input. It''s a bit lighter and easily wraps to a new line.</small>
        </div>

        <button type="submit" className="btn btn-primary" onClick={this.submitForm.bind(this)}>Add Category</button>
      </form>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    categoriesAsTree: state.categoriesAsTree
  }
}

CategoryForm.propTypes = {
  fnSubmit: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(CategoryForm);
