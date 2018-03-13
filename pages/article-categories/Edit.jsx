import React from 'react';
import {MainLayout} from 'components/layouts';
import ArticleCategoryForm from 'components/article-category/ArticleCategoryForm.jsx';
import {ArticleCategories} from 'base/api';
import {toastr} from 'react-redux-toastr';

class EditArticleCategory extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      category: {}
    }
  }

  cb(response) {
    // Back to categories list
    toastr.removeByType("success");
    toastr.success("", "Cập nhật thành công")
    this.props.history.push('/article-categories');
  }

  componentDidMount() {
    ArticleCategories.actions.get.request({id: this.props.match.params.id}).then(response => {
      this.setState({
        category: response.data
      })
    })
  }

  render() {
    return (
      <MainLayout>
        <div>
          <div className="register-logo">
            <b>Cập nhật Tin Khuyến Mãi</b>
          </div>
          <ArticleCategoryForm fnSubmit={ArticleCategories.actions.update} cb={this.cb.bind(this)} data={this.state.category}/>
        </div>
      </MainLayout>
    );
  }
}

EditArticleCategory.contextTypes = {
  router: React.PropTypes.object
};

export default EditArticleCategory;
