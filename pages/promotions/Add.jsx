import React from 'react';
import {MainLayout} from 'components/layouts';
import PromotionForm from 'components/promotion/PromotionForm.jsx';
import {Promotions} from 'base/api';
import {toastr} from 'react-redux-toastr';

class AddPromotion extends React.Component {
  constructor(props, context) {
    super(props, context);

  }
  cb(response) {
    // Back to categories list
    toastr.removeByType("success");
    toastr.success("", "Thêm mới thành công")
    this.props.history.push('/promotions');
  }

  render() {
    return (
      <MainLayout>
        <div>
          <div className="register-logo">
            <b>Thêm Tin Khuyến Mãi</b>
          </div>
          <PromotionForm fnSubmit={Promotions.actions.add} cb={this.cb.bind(this)}/>
        </div>
      </MainLayout>
    );
  }
}

AddPromotion.contextTypes = {
  router: React.PropTypes.object
};

export default AddPromotion;
