import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {ArticleList} from 'components/article';
import {Link} from 'react-router-dom';

class ListArticles extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <MainLayout>
        <div>
          <h1>Quản lý Tin Tức</h1>
          [ <Link to="articles/add">Thêm Tức mới</Link>]
          <ArticleList/>
        </div>
      </MainLayout>
    );
  }
}

export default ListArticles;
