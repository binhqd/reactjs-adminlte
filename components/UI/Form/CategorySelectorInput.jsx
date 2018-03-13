import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Select from 'react-select';

class CategorySelectorInput extends Component {
  constructor (props, context) {
    super(props, context);

    this.state = {
      removeSelected: true,
      disabled: false,
      crazy: false,
      stayOpen: false,
      value: [],
      rtl: false,
      options: []
    };

    this.props.categories && this.props.categories.length > 0 && this.props.categories.map(category => {
      this.state.options.push({
        label: category.name,
        value: category.id
      })
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.categories != this.props.categories) {

      let options = [];
      nextProps.categories && nextProps.categories.length > 0 && nextProps.categories.map(category => {
        options.push({
          label: category.name,
          value: category.id
        })
      });

      this.setState({
        options
      })
    }
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
        <Select
          closeOnSelect={!stayOpen}
          disabled={disabled}
          multi
          onChange={this.handleSelectChange.bind(this)}
          options={this.state.options}
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

CategorySelectorInput.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func
}

CategorySelectorInput.defaultProps = {
  onChange: function() {
    console.log('You need to implement onChange method for CategorySelectorInput');
  }
}


export default connect(bindStateToProps)(CategorySelectorInput);
