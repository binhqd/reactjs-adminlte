import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {BusinessList} from 'components/business';
import {Link} from 'react-router-dom';

class ListCategories extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <MainLayout>
        <div>
          <h1>Quản lý thông tin doanh nghiệp</h1>
          <BusinessList status='APPROVED'/>
        </div>
      </MainLayout>
    );
  }
}

export default ListCategories;
