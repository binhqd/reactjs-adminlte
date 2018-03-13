import React from 'react';
import { PropTypes } from 'prop-types';
import { ShowIf } from 'components/utils';
import { validatable } from 'components/utils';

class Input extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: this.props.value,
      isValid: true
    }
  }

  onChange(e) {
    if (this.props.type == 'password') {
      return;
    }
    this.setState({
      value: e.target.value
    });

    this.props.onChange(e);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    });

    if(nextProps.required && typeof nextProps.value == 'string' && nextProps.value.trim()) {
      this.setState({
        isValid: true
      });
    }
  }

  classNames() {
    if (this.state.isValid) {
      return 'form-control';
    } else {
      return 'form-control danger';
    }
  }

  validate() {
    if ((typeof this.state.value == 'string' && this.state.value.trim() == '') && this.props.required) {
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

  handleFocus(e) {
    e.target.select();
  }

  render() {
    return (
      <div className={this.props.className + ' form-group'}>
        <ShowIf condition={this.props.label != ''}>
          <label className="ip-label">
            { this.props.label }
            <ShowIf condition={this.props.required}>
              <span className="text-required">&nbsp;*</span>
            </ShowIf>
          </label>
        </ShowIf>
        <input disabled={this.props.disabled} onFocus={this.handleFocus.bind(this)}
          style={{textAlign: this.props.align}}
          type={this.props.type}
          className={ this.classNames() }
          ref={(input) => {this.input = input}}
          maxLength={this.props.maxLength}
          value={this.state.value}
          onChange={ this.onChange.bind(this) }
          placeholder={this.props.placeholder}
          name={this.props.name}/>
        <ShowIf condition={this.props.iconClassName != ''}>
          <span className={`${this.props.iconFontSet} ${this.props.iconClassName} form-control-feedback`}></span>
        </ShowIf>

        <ShowIf condition={!this.state.isValid && this.state.value.trim()== ''}>
          <div className="pt-form-helper-text">{this.props.errorMessage}</div>
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
  errorMessage: PropTypes.string,
  iconFontSet: PropTypes.string
}

Input.defaultProps = {
  type: 'text',
  className: '',
  label: '',
  align: 'left',
  onChange: function() {
    console.log('Need to assign onChange method');
  },
  placeholder: null,
  required: false,
  maxLength: 255,
  name: '',
  errorMessage: 'Dữ liệu không đúng',
  iconFontSet: 'fa'
}

export default validatable(Input);
