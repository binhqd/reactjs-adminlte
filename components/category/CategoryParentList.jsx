import React from 'react';
import PropTypes from 'prop-types';

const CategoryParentListItem = function(props) {
  return (
    <li onClick={props.onClick.bind(this, props.data.id)}>{props.data.name}</li>
  )
}
class CategoryParentListItemWithChildren extends React.Component {
  componentDidMount() {
    const _this = this;
    $(this.refs.submenuLabel).on("click", function(e) {
      _this.props.onClick(_this.props.data.id)

      $(this).next('ul').toggle();
      e.stopPropagation();
      e.preventDefault();
    });
  }
  render() {
    return (
      <li className="dropdown-submenu">
        <a ref='submenuLabel' className="test" tabIndex="-1" href="#" onClick={this.props.onClick.bind(this, this.props.data.id)}>{this.props.data.name}<span className="caret"></span></a>
        <CategoryParentList data={this.props.data.children} onClick={this.props.onClick}/>
      </li>
    )
  }
}

class CategoryParentList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selected: ''
    }
  }
  onClick(value, e) {
    this.setState({
      selected: value
    });
  }
  render() {
    return (
      <ul className="dropdown-menu">
        {this.props.data.map(item => {
          if (typeof item.children != "undefined" && item.children.length > 0) {
            return (
              <CategoryParentListItemWithChildren data={item} onClick={this.onClick.bind(this)}/>
            );
          } else return (
            <CategoryParentListItem data={item} onClick={this.onClick.bind(this)}/>
          )
        })}

      </ul>
    );
  }
}

CategoryParentList.propTypes = {
  categoriesAsTree: PropTypes.array.isRequired
}

export default CategoryParentList;
