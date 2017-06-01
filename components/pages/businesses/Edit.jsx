import React from 'react';
import {MainLayout} from 'components/layouts';
import {BusinessForm} from 'components/business';
import {Businesses} from 'base/api';
import { browserHistory } from 'react-router'

class EditBusiness extends React.Component {
  constructor(props, context) {
    super(props, context);

  }

  cb(response) {
    // Back to categories list
    console.log(response);
    // browserHistory.push('/businesses');
  }

  render() {
    return (
      <MainLayout>
        <div>
          Cập Nhật Thông Tin Doanh Nghiệp
          <BusinessForm fnSubmit={Businesses.actions.update} cb={this.cb.bind(this)} businessId={this.props.params.id}/>
        </div>
      </MainLayout>
    );
  }
}

export default EditBusiness;
