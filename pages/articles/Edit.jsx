import React from 'react';
import {MainLayout} from 'components/layouts';
import ArticleForm from 'components/article/ArticleForm.jsx';
import {Articles} from 'base/api';
import {toastr} from 'react-redux-toastr';

class EditArticle extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      article: {}
    }
  }

  cb(response) {
    // Back to categories list
    toastr.removeByType("success");
    toastr.success("", "Cập nhật thành công")
    this.props.history.push('/articles');
  }

  componentDidMount() {
    Articles.actions.get.request({id: this.props.match.params.id}).then(response => {
      this.setState({
        article: response.data
      })
    })
  }

  render() {
    return (
      <MainLayout>
        <div>
          <div className="register-logo">
            <b>Cập nhật Tin Tức</b>
          </div>
          <ArticleForm fnSubmit={Articles.actions.update} cb={this.cb.bind(this)} data={this.state.article}/>
        </div>
      </MainLayout>
    );
  }
}

EditArticle.contextTypes = {
  router: React.PropTypes.object
};

export default EditArticle;
