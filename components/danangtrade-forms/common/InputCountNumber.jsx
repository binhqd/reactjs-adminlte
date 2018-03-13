import React from 'react';
import _InputCountNumber from './_InputCountNumber.scss';

const PhoneNumber = (input) => {
  return input = input.replace(/[^0-9]+/g, "");
}

class InputCountNumber extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isValid: true,
      value: this.props.value
    }
  }

  onChange(e) {
    e.target.value = PhoneNumber(e.target.value);
    this.setState({
      value: e.target.value
    });
    this.props.onChange(e);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value != nextProps.value) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  nextValue() {
    let value = Number(this.state.value);
    value = value + 1;
    this.setState({
      value: value
    })
    let e={
      target: {
        value: ''
      }
    };
    e.target.value = value;
    this.props.onChange(e);
  }

  prevValue() {
    if (Number(this.state.value) == 0) {
      this.setState({
        value: 0
      })
      let e={
        target: {
          value: ''
        }
      };
      e.target.value =  0;
      this.props.onChange(e);
    } else {
      let value = Number(this.state.value);
      value = value - 1;
      this.setState({
        value: value
      })
      let e={
        target: {
          value: ''
        }
      };
      e.target.value = value;
      this.props.onChange(e);
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className="wrap-input-number">
          <span className="prev-value" onClick={this.prevValue.bind(this)}>-</span>
          <input className='input-count-value' type="text" min={0} value={this.state.value} onChange={ this.onChange.bind(this) }/>
          <span className="next-value" onClick={this.nextValue.bind(this)}>+</span>
        </div>
      </div>
    );
  }
}

InputCountNumber.defaultProps = {
  className: 'input-count-number',
  onChange: function() {
    console.log('Need to assign onChange method');
  },
  value: 0
}

export default InputCountNumber;
