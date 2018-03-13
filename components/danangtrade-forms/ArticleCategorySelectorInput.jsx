import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Select from 'react-select';
import {ArticleCategories} from 'api';

class ArticleCategorySelectorInput extends Component {
  constructor (props, context) {
    super(props, context);

    this.state = {
      removeSelected: true,
      disabled: false,
      value: this.props.data || null,
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
    if (this.props.data != nextProps.data) {
      this.setState({
        value: (nextProps.data) || null
      })
    }
  }

  componentDidMount() {
    ArticleCategories.actions.list.request().then(response => {
      let options = [];
      response.data.map(category => {
         options.push({
          label: category.name,
          value: category.id
        })
      })

      this.setState({
        options
      })
    });
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
          closeOnSelect={true}
          disabled={disabled}
          multi={false}
          onChange={this.handleSelectChange.bind(this)}
          options={this.state.options}
          placeholder="Chọn danh mục tin..."
          removeSelected={this.state.removeSelected}
          rtl={this.state.rtl}
          simpleValue={true}
          value={value}
        />
      </div>
    );
  }

}

ArticleCategorySelectorInput.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  multi: PropTypes.bool,
  stayOpen: PropTypes.bool
}

ArticleCategorySelectorInput.defaultProps = {
  onChange: function() {
    console.log('You need to implement onChange method for ArticleCategorySelectorInput');
  },
  data: null,
  multi: true,
  stayOpen: true
}


export default connect()(ArticleCategorySelectorInput);
