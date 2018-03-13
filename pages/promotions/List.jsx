import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {PromotionList} from 'components/promotion';
import {Link} from 'react-router-dom';

class ListPromotions extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <MainLayout>
        <div>
          <h1>Quản lý Tin Khuyến Mãi</h1>
          [ <Link to="promotions/add">Thêm Khuyến Mãi mới</Link>]
          <PromotionList/>
        </div>
      </MainLayout>
    );
  }
}

export default ListPromotions;
