import React from 'react';
import {MainLayout} from 'components/layouts';
import BusinessForm from 'components/business/BusinessForm.v2.jsx';
import {Businesses} from 'base/api';
import { withRouter } from 'react-router-dom';

class AddBusiness extends React.Component {
  constructor(props, context) {
    super(props, context);

  }
  cb(response) {
    // Back to businesses list
    this.props.history.push('/businesses');
  }

  render() {
    return (
      <MainLayout>
        <div>
          <div className="register-logo">
            <b>Thêm thông tin doanh nghiệp</b>
          </div>
          <BusinessForm fnSubmit={Businesses.actions.add} cb={this.cb.bind(this)}/>
        </div>
      </MainLayout>
    );
  }
}

export default withRouter(AddBusiness);
