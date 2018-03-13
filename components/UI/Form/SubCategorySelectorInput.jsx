import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Select from 'react-select';
import style from './_SubCategorySelectorInput.scss';

class SubCategorySelectorInput extends Component {
  constructor (props, context) {
    super(props, context);

    this.state = {
      removeSelected: true,
      disabled: false,
      stayOpen: true,
      value: [],
      rtl: false,
      options: [],
      subCategories: [],
      selectCategoryText: this.props.selectCategoryText
    };

    this.hashCategories = {}

    this.props.categories && this.props.categories.length > 0 && this.props.categories.map(category => {
      this.state.options.push({
        label: category.name,
        value: category.id
      });

      this.hashCategories[category.id] = category;
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.categories != this.props.categories) {
      let options = [];
      nextProps.categories && nextProps.categories.length > 0 && nextProps.categories.map(category => {
        options.push({
          label: category.name,
          value: category.id
        });

        this.hashCategories[category.id] = category;
      });

      this.setState({
        options
      });

      // this.selectCategory(options[0].value);
    }
  }

  selectCategory(e) {
    let categoryId = e.target ? e.target.value : e;
    let subCategories = [];
    this.hashCategories[categoryId] && this.hashCategories[categoryId].children && this.hashCategories[categoryId].children.map(subCategory => {
      subCategories.push({
        label: subCategory.name,
        value: subCategory.id
      })
    });

    this.setState({
      subCategories,
      selectCategoryText: this.hashCategories[categoryId].name
    });

    // this.refs.selector.focus();
  }

  handleSelectChange (value) {
    this.setState({ value });

    this.props.onChange(value);
  }

  render () {
    const { crazy, disabled, stayOpen, value } = this.state;
    return (
      <div className="section">
        <h3 className="section-heading">{this.props.label}</h3>

        <div className="dropdown">
          <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            {this.state.selectCategoryText}
            <span className="caret"></span>
          </button>

          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            {
              this.state.options.map(category => {
                return (
                  <li onClick={this.selectCategory.bind(this, category.value)}><a href="#">{category.label}</a></li>
                )
              })
            }
          </ul>
        </div>

        <Select
          ref="selector"
          closeOnSelect={!stayOpen}
          disabled={disabled}
          multi
          onChange={this.handleSelectChange.bind(this)}
          options={this.state.subCategories}
          placeholder="Select Categories.."
          removeSelected={this.state.removeSelected}
          rtl={this.state.rtl}
          simpleValue={false}
          value={value}
        />
      </div>
    );
  }

}

let bindStateToProps = (state) => {
  return {
    categories: state.categoriesAsTree
  }
}

SubCategorySelectorInput.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func
}

SubCategorySelectorInput.defaultProps = {
  onChange: function() {
    console.log('You need to implement onChange method for CategorySelectorInput');
  },
  selectCategoryText: 'Select a category'
}


export default connect(bindStateToProps)(SubCategorySelectorInput);
