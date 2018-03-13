import React from 'react';
import {PropTypes} from 'prop-types';
import Promise from 'bluebird';
import {connect} from 'react-redux';
import {ArticleCategories} from 'api';
import {SingleImageUploader} from 'components/uploader';
import CONFIG from 'base/constants/config';
import {ShowIf} from 'components/utils';
import {withRouter} from 'react-router-dom';

class BusinessForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      "name": ""
    }
  }

  bindData(data) {
    const {name} = data;

    this.setState({
      name
    })
  }

  onInputChange(name, e) {
    let value = e.target ? e.target.value : e;
    this.setState({
      [name]: value
    })
  }

  submitForm(e) {
    e.preventDefault();

    let params = {};

    let data = {
      ...this.state
    }

    if (this.props.data && typeof this.props.data.id != "undefined") {
      params = {id: this.props.data.id};
    }

    return this.props.dispatch(this.props.fnSubmit(params, {
      data
    }))
      .then(response => {
        // reload list
        // this.props.dispatch(ArticleCategories.actions.list());

        if (typeof this.props.cb == 'function') {
          this.props.cb(response);
        }

        return Promise.resolve(response)
      })
      .catch(err => {
        Promise.reject(err);
      })
  }

  componentDidMount() {
    if (this.props.data) {
      this.bindData(this.props.data)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data != this.state.data) {
      this.bindData(nextProps.data);
    }
  }

  render() {

    return (
      <div>
        <form onSubmit={this.submitForm.bind(this)}>
          <div className="form-group">
            <label>Tên Danh Mục</label>
            <input type="text" className="form-control" value={this.state.name} placeholder="Tên" onChange={this.onInputChange.bind(this, 'name')}/>
          </div>

          <ShowIf condition={this.props.data}>
            <button type="submit" className="btn btn-primary btn-submit text-btn">Cập nhật</button>
          </ShowIf>
          <ShowIf condition={!this.props.data}>
            <button type="submit" className="btn btn-primary btn-submit text-btn">Thêm</button>
          </ShowIf>

          <button type='button' className="btn" onClick={() => this.props.history.push('/article-categories')}>Thoát</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {

  }
}

BusinessForm.propTypes = {
  fnSubmit: PropTypes.func.isRequired
}

BusinessForm.contextTypes = {
  router: React.PropTypes.object
};

export default withRouter(connect(mapStateToProps)(BusinessForm));
