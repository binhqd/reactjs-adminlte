import React from 'react';
import {MainLayout} from 'components/layouts';
import {PromotionForm} from 'components/promotion';
import {Promotions} from 'base/api';
import { browserHistory } from 'react-router'

class AddPromotion extends React.Component {
  constructor(props, context) {
    super(props, context);

  }
  cb(response) {
    // Back to promotions list
    browserHistory.push('/promotions');
  }

  render() {
    return (
      <MainLayout>
        <div>
          Thêm Mới Tin Khuyến Mãi
          <PromotionForm fnSubmit={Promotions.actions.add} cb={this.cb.bind(this)}/>
        </div>
      </MainLayout>
    );
  }
}

export default AddPromotion;
