import React from 'react';
import { PropTypes } from 'prop-types';
import { ShowIf } from 'components/utils';
import {validatable} from 'components/utils';
import shortid from 'shortid';

class Input extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: (typeof this.props.value != "undefined" && this.props.value != null) ? this.props.value.toString() : '',
      isValid: true,
      validationText: this.props.validationText
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
        isValid: false,
        validationText: this.props.required
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
        <input
          style={{textAlign: this.props.align}}
          type={this.props.type}
          className={ 'form-control' }
          ref={(input) => {this.input = input}}
          maxLength={this.props.maxLength}
          value={this.state.value}
          onChange={ this.onChange.bind(this) }
          onFocus={this.handleFocus.bind(this)}
          placeholder={this.props.placeholder}
          name={this.props.name}/>
          <ShowIf condition={!this.state.isValid}>
          <span className="help-block">{this.state.validationText}</span>
        </ShowIf>
      </div>
    );
  }
}

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  align: PropTypes.string,
  required: PropTypes.string
}

Input.defaultProps = {
  type: 'text',
  className: 'input-group',
  label: '',
  align: 'left',
  onChange: function() {
    console.log('Need to assign onChange method');
  },
  placeholder: null,
  required: '',
  maxLength: 255,
  name:'',
  validationText: 'error'
}

export default validatable(Input);
