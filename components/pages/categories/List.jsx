import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {CategoryList} from 'components/category';

class ListCategories extends React.Component {
  constructor(props, context) {
    super(props, context);


  }

  render() {
    return (
      <MainLayout>
        <div>
          <h1>Categories</h1>
          <CategoryList/>
        </div>
      </MainLayout>
    );
  }
}

export default ListCategories;
