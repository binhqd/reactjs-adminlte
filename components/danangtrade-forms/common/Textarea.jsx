import React from 'react';
import { PropTypes } from 'prop-types';
import { ShowIf } from 'components/utils';
import {validatable} from 'components/utils';
import shortid from 'shortid';
import style from './_textarea.scss';

class Textarea extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: (typeof this.props.value != "undefined" && this.props.value != null) ? this.props.value.toString() : '',
      isValid: true,
      errorMessage: this.props.errorMessage
    }

    this.id = shortid();
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    });

    this.props.onChange(e);
  }

  value() {
    return this.state.value;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value != nextProps.value) {
      let value = (typeof nextProps.value != "undefined" && nextProps.value != null) ? nextProps.value.toString() : '';

      this.setState({
        value: value
      });

      if (nextProps.required && value.trim()) {
        this.setState({
          isValid: true
        });
      }
    }
  }

  classNames() {
    if (this.state.isValid) {
      return 'form-group';
    } else {
      return 'form-group has-error';
    }
  }

  validate() {
    if (this.state.value.trim() == '' && this.props.required) {
      this.setState({
        isValid: false
      });

      this.input.focus();
      return false;
    } else {
      this.setState({
        isValid: true
      });

      return true;
    }
  }

  focus() {
    this.input.focus();
  }

  handleFocus(e) {
    e.target.select();
  }

  render() {
    return (
      <div className={`${this.props.className} ` + this.classNames() }>
        <ShowIf condition={this.props.label != ''}>
          <label>
            { this.props.label }
            <ShowIf condition={this.props.required}>
              <span className="text-required">&nbsp;*</span>
            </ShowIf>
          </label>
        </ShowIf>
        <ShowIf condition={this.props.heading != null}>
          <this.props.heading/>
        </ShowIf>
        <textarea
          style={{width: this.props.width, height: this.props.height}}
          type={this.props.type}
          rows={this.props.rows}
          className={ `form-control ${this.props.inputClassName}` }
          ref={(input) => {this.input = input}}
          maxLength={this.props.maxLength}
          value={this.state.value}
          onChange={ this.onChange.bind(this) }
          onFocus={this.handleFocus.bind(this)}
          placeholder={this.props.placeholder}
          name={this.props.name}></textarea>
          <ShowIf condition={!this.state.isValid}>
          <span className="pt-form-helper-text">{this.state.errorMessage}</span>
        </ShowIf>
      </div>
    );
  }
}

Textarea.propTypes = {
  rows: PropTypes.number,
  type: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  heading: PropTypes.any,
  errorMessage: PropTypes.string
};

Textarea.defaultProps = {
  rows: 5,
  type: 'text',
  className: 'input-group',
  inputClassName: '',
  label: '',
  onChange: function() {
    console.log('Need to assign onChange method');
  },
  placeholder: null,
  required: false,
  maxLength: 255,
  name:'',
  errorMessage: 'error',
  width: '100%',
  height: 'auto',
  heading: null
}

export default validatable(Textarea);
