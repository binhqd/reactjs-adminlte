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
          <h1>Doanh nghiệp bị từ chối</h1>
          <BusinessList status='REJECTED'/>
        </div>
      </MainLayout>
    );
  }
}

export default ListCategories;
