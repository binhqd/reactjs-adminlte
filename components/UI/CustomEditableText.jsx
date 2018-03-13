import React, { Component } from 'react';
import { EditableText } from 'components/UI/Form';
import { PropTypes } from 'prop-types';

class InputComponent extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: this.props.value
    }
  }

  componentDidMount() {
    this.refs.input.focus();
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  onUpdate() {
    this.props.onUpdate(this.state.value);
  }

  render() {
    return (
      <div className="user-form-group has-feedback fg-custom">
        <input ref='input' type="text" className="form-control"
          value={this.state.value}
          placeholder={this.props.placeholder}
          onBlur={this.onUpdate.bind(this)}
          onChange={this.onChange.bind(this)}
        />
        <span className={this.props.className}></span>
      </div>
    )
  }
}
class CustomEditableText extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: this.props.value
    }
  }

  onUpdate(value) {
    this.setState({
      value
    });
    this.props.onUpdate(value);
  }

  render() {
    return (
      <EditableText value='test' isEditing={false}
        TextComponent={
          (props) =>
          <div className="box-wrap user-info-right" onClick={props.onClick}>
            <h2 className="user-content">{this.props.label}: {this.state.value}</h2>
            <a href="javascript:void(0)" className="update-link">{this.props.linkText}</a>
          </div>
        }
        InputComponent={InputComponent}
        onUpdate={this.onUpdate.bind(this)}
        value={this.state.value}
        textClassName={this.props.textClassName}
        placeholder={this.props.placeholder}
      />
    );
  }
}

CustomEditableText.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  linkText: PropTypes.string,
  onUpdate: PropTypes.func
}

CustomEditableText.defaultProps = {
  linkText: 'Đổi',
  onUpdate: function(val) {
    console.log(val);
  },
  textClassName: 'form-control'
}

export default CustomEditableText;
