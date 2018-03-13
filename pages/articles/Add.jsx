import React from 'react';
import {MainLayout} from 'components/layouts';
import ArticleForm from 'components/article/ArticleForm.jsx';
import {Articles} from 'base/api';
import {toastr} from 'react-redux-toastr';

class AddArticle extends React.Component {
  constructor(props, context) {
    super(props, context);

  }
  cb(response) {
    // Back to categories list
    toastr.removeByType("success");
    toastr.success("", "Thêm mới thành công")
    this.props.history.push('/articles');
  }

  render() {
    return (
      <MainLayout>
        <div>
          <div className="register-logo">
            <b>Thêm Tin Tức</b>
          </div>
          <ArticleForm fnSubmit={Articles.actions.add} cb={this.cb.bind(this)}/>
        </div>
      </MainLayout>
    );
  }
}

AddArticle.contextTypes = {
  router: React.PropTypes.object
};

export default AddArticle;
