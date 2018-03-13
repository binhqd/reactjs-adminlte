import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const {categoryTreeToArray} = require('lib/arrayToTree');

const rootValue = '';
class CategoryParentList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selected: this.props.parentCategory == null ? '' : this.props.parentCategory
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.parentCategory != null && nextProps.parentCategory != this.state.selected) {
      this.setState({
        selected: nextProps.parentCategory
      })
    }
  }

  handleChange(e) {
    if (e.target.value == rootValue) {
      this.props.onChange(null);
      return;
    }

    let selectedCat = this.props.categoryHash[e.target.value];

    if (typeof this.state.selected == "undefined" || selectedCat.id != this.state.selected) {
      this.setState({
        selected: selectedCat
      });

      this.props.onChange(selectedCat.id);
    }
  }

  render() {

    let options = categoryTreeToArray([], this.props.categoriesAsTree, 0);

    return (
      <select className="form-control" onChange={this.handleChange.bind(this)} value={this.state.selected}>
        <option value={rootValue}>{this.props.rootCatName}</option>
        {
          options.map(item => {
            if (this.props.showAll) {

              let prefix = (new Array(item.level)).join('--');
              return (
                <option key={item.id} value={item.id}>{prefix}{item.name}</option>
              )
            } else if (item.level == 1) {
              return (
                <option key={item.id} value={item.id}>{item.name}</option>
              )
            }

          })
        }
      </select>
    )
  }
}

CategoryParentList.propTypes = {
  categoriesAsTree: PropTypes.array.isRequired
}

CategoryParentList.defaultProps = {
  rootCatName: 'Root category',
  showAll: false
}

const mapStateToProps = function(state) {
  return {
    categoriesAsTree: state.categoriesAsTree,
    categoryHash: state.categoryHash
  }
}

export default connect(mapStateToProps)(CategoryParentList);
