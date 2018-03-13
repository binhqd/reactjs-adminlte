import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {BusinessList} from 'components/business';
import {Link} from 'react-router';

class ListCategories extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <MainLayout>
        <div>
          <h1>Doanh nghiệp</h1>
          [ <Link to="businesses/add">Thêm mới doanh nghiệp</Link>]
          <BusinessList/>
        </div>
      </MainLayout>
    );
  }
}

export default ListCategories;
