import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {CategoryList} from 'components/category';
import {Link} from 'react-router-dom';

class ListCategories extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <MainLayout>
        <div>
          <h1>Danh mục</h1>
          [ <Link to="categories/add">Tạo mới danh mục</Link>]
          <CategoryList/>
        </div>
      </MainLayout>
    );
  }
}

export default ListCategories;
