import React from 'react';
import PropTypes from 'prop-types';

const CategoryParentListItem = function(props) {
  return (
    <li onClick={props.onClick.bind(this, props.data)}>{props.data.name}</li>
  )
}

class CategoryParentListItemWithChildren extends React.Component {
  componentDidMount() {
    const _this = this;
    $(this.refs.submenuLabel).on("click", function(e) {
      _this.props.onClick(_this.props.data)

      $(this).next('ul').toggle();
      e.stopPropagation();
      e.preventDefault();
    });
  }
  render() {
    return (
      <li className="dropdown-submenu">
        <a ref='submenuLabel' className="test" tabIndex="-1" href="#" onClick={this.props.onClick.bind(this, this.props.data)}>{this.props.data.name}<span className="caret"></span></a>
        <DropdownList data={this.props.data.children} onClick={this.props.onClick.bind(this)}/>
      </li>
    )
  }
}

class DropdownList extends React.Component {
  render() {
    return (
      <ul className="dropdown-menu">
        <li onClick={this.props.onClick.bind(this, null)}>{this.props.rootCatName}</li>
        {this.props.data.map(item => {
          if (typeof item.children != "undefined" && item.children.length > 0) {
            return (
              <CategoryParentListItemWithChildren data={item} onClick={this.props.onClick.bind(this)}/>
            );
          } else return (
            <CategoryParentListItem data={item} onClick={this.props.onClick.bind(this)}/>
          )
        })}
      </ul>
    )
  }
}

class CategoryParentList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selected: this.props.parentCategory
    }
  }

  onClick(selectedCat, e) {
    if (typeof this.state.selected == "undefined" || selectedCat.id != this.state.selected.id) {
      this.setState({
        selected: selectedCat
      });

      this.props.onClick(selectedCat.id);
    }

  }

  render() {
    return (
      <div className="dropdown">
        <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          { typeof this.props.parentCategory != "undefined" ? this.props.parentCategory.name : this.props.rootCatName }
          <span className="caret"></span>
        </button>
        <DropdownList data={this.props.data} onClick={this.onClick.bind(this)}/>
      </div>
    );
  }
}

CategoryParentList.propTypes = {
  categoriesAsTree: PropTypes.array.isRequired,
  parentCategory: PropTypes.object
}

CategoryParentList.defaultProps = {
  rootCatName: 'Danh mục gốc'
}

export default CategoryParentList;
