import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Select from 'react-select';
import style from './_SubCategorySelectorInput.scss';
require('fg-select-css/src/select-css.css');
require('fg-select-css/src/select-css-theme.css');
require('fg-select-css/src/select-css-arrow.css');

class SubCategorySelectorInput extends Component {
  constructor (props, context) {
    super(props, context);

    this.state = {
      removeSelected: true,
      disabled: false,
      stayOpen: true,
      value: (this.props.data && this.props.data.length > 0 && this.props.data) || [],
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

  componentDidMount() {
    this.props.categories && this.props.categories[0] && this.selectCategory(this.props.categories[0].id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      this.setState({
        value: (nextProps.data && nextProps.data.length > 0 && nextProps.data) || []
      });
    }

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

      this.selectCategory(options[0].value);
    }
  }

  selectCategory(e) {
    let categoryId = e.target ? e.target.value : e;
    let subCategories = [];
    this.hashCategories[categoryId] && this.hashCategories[categoryId].children && this.hashCategories[categoryId].children.map(subCategory => {
      subCategories.push({
        label: subCategory.name,
        value: subCategory.id
      });
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

        <div className="dropdown custom-select">
          <select onChange={this.selectCategory.bind(this)}>
            {
              this.state.options.map(category => {
                return (
                  <option value={category.value}>{category.label}</option>
                )
              })
            }
          </select>
        </div>

        <Select
          ref="selector"
          closeOnSelect={!stayOpen}
          disabled={disabled}
          multi
          onChange={this.handleSelectChange.bind(this)}
          options={this.state.subCategories}
          placeholder="Chọn nhóm sản phẩm..."
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
  onChange: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.string)
}

SubCategorySelectorInput.defaultProps = {
  onChange: function() {
    console.log('You need to implement onChange method for CategorySelectorInput');
  },
  selectCategoryText: 'Select a category',
  data: []
}


export default connect(bindStateToProps)(SubCategorySelectorInput);
