import React from 'react';
import {MainLayout} from 'components/layouts';
import {PromotionForm} from 'components/promotion';
import {Promotions} from 'base/api';
import { browserHistory } from 'react-router'

class EditPromotion extends React.Component {
  constructor(props, context) {
    super(props, context);

  }

  cb(response) {
    // Back to categories list
    browserHistory.push('/promotions');
  }

  render() {
    return (
      <MainLayout>
        <div>
          Cập Nhật Thông Tin Doanh Nghiệp
          <PromotionForm fnSubmit={Promotions.actions.update} cb={this.cb.bind(this)} promotionId={this.props.params.id}/>
        </div>
      </MainLayout>
    );
  }
}

export default EditPromotion;
