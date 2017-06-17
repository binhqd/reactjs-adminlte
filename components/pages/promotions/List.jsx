import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {PromotionList} from 'components/promotion';
import {Link} from 'react-router';

class ListPromotions extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <MainLayout>
        <div>
          <h1>Khuyến mãi</h1>
          [ <Link to="/promotions/add">Thêm mới tin khuyến mãi</Link>]
          <PromotionList/>
        </div>
      </MainLayout> 
    );
  }
}

export default ListPromotions;
