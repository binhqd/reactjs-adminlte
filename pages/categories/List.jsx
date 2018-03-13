import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {CategoryList} from 'components/category';
import {Link} from 'react-router';

class ListCategories extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <MainLayout>
        <div>
          <h1>Categories</h1>
          [ <Link to="categories/add">Create new Category</Link>]
          <CategoryList/>
        </div>
      </MainLayout>
    );
  }
}

export default ListCategories;
