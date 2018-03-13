import React from 'react';
import {MainLayout} from 'components/layouts';
import PromotionForm from 'components/promotion/PromotionForm.jsx';
import {Promotions} from 'base/api';
import {toastr} from 'react-redux-toastr';

class EditPromotion extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      promotion: {}
    }
  }

  cb(response) {
    // Back to categories list
    toastr.removeByType("success");
    toastr.success("", "Cập nhật thành công")
    this.props.history.push('/promotions');
  }

  componentDidMount() {
    Promotions.actions.get.request({id: this.props.match.params.id}).then(response => {
      this.setState({
        promotion: response.data
      })
    })
  }

  render() {
    return (
      <MainLayout>
        <div>
          <div className="register-logo">
            <b>Cập nhật Tin Khuyến Mãi</b>
          </div>
          <PromotionForm fnSubmit={Promotions.actions.update} cb={this.cb.bind(this)} data={this.state.promotion}/>
        </div>
      </MainLayout>
    );
  }
}

EditPromotion.contextTypes = {
  router: React.PropTypes.object
};

export default EditPromotion;
