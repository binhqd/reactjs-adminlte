import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {ArticleCategoryList} from 'components/article-category';
import {Link} from 'react-router-dom';

class ListArticleCategories extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <MainLayout>
        <div>
          <h1>Quản lý danh mục tin</h1>
          [ <Link to="/article-categories/add">Thêm Danh Mục Tin mới</Link>]
          <ArticleCategoryList/>
        </div>
      </MainLayout>
    );
  }
}

export default ListArticleCategories;
