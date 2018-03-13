import React from 'react';
import {MainLayout} from 'components/layouts';
import BusinessForm from 'components/business/BusinessForm.v2.jsx';
import {Businesses} from 'base/api';
import {toastr} from 'react-redux-toastr';
import { withRouter } from 'react-router-dom';

class EditBusiness extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      business: {}
    }
  }

  cb(response) {
    Businesses.actions.approve.request({
      id: response.data.id
    }).then(approvedInfo => {
      toastr.removeByType('success');
      toastr.success('Thành công!', 'Doanh nghiệp đã được cập nhật thành công.');
      //
      this.props.history.push('/businesses');
    })


  }

  componentDidMount() {
    Businesses.actions.get.request({id: this.props.match.params.id}).then(response => {
      this.setState({
        business: response.data
      })
    })
  }

  render() {
    return (
      <MainLayout>
        <div>
          <div className="register-logo">
            <b>Cập nhật thông tin doanh nghiệp</b>
          </div>
          <BusinessForm fnSubmit={Businesses.actions.update} cb={this.cb.bind(this)} data={this.state.business}/>
        </div>
      </MainLayout>
    );
  }
}

export default withRouter(EditBusiness);
