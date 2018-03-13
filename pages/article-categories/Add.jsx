import React from 'react';
import {MainLayout} from 'components/layouts';
import ArticleCategoryForm from 'components/article-category/ArticleCategoryForm.jsx';
import {ArticleCategories} from 'base/api';
import {toastr} from 'react-redux-toastr';

class AddArticleCategory extends React.Component {
  constructor(props, context) {
    super(props, context);

  }
  cb(response) {
    // Back to categories list
    toastr.removeByType("success");
    toastr.success("", "Thêm mới thành công")
    this.props.history.push('/article-categories');
  }

  render() {
    return (
      <MainLayout>
        <div>
          <div className="register-logo">
            <b>Thêm Danh Mục Tin</b>
          </div>
          <ArticleCategoryForm fnSubmit={ArticleCategories.actions.add} cb={this.cb.bind(this)}/>
        </div>
      </MainLayout>
    );
  }
}

AddArticleCategory.contextTypes = {
  router: React.PropTypes.object
};

export default AddArticleCategory;
