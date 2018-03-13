import React from 'react';
import style from './style.scss';

class Checkbox extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: this.props.value,
      label: this.props.label
    }
  }

  onChange(e) {
    this.setState({
      value: !this.state.value
    }, () => {
      let data = {
        target: {
          value: this.state.value
        }
      }
      this.props.onChange(data);
    })
  }

  render() {
    return (
      <div className='check-box'>
        <section className="check-box-wrap">
          <input className='check-box' type='checkbox' checked={this.state.value} onChange={this.onChange.bind(this)}/>
          <label className='lb-check-box'>{this.state.label}</label>
        </section>
      </div>
    );
  }
}

Checkbox.defaultProps = {
  onChange: function () {
    console.log('Need to assign onChange method');
  },
  value: false,
  label: 'This is label'
}

export default Checkbox;