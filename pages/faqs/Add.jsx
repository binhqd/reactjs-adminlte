import React from 'react';
import {MainLayout} from 'components/layouts';
import FAQForm from 'components/faq/FAQForm.jsx';
import {FAQs} from 'base/api';
import {toastr} from 'react-redux-toastr';

class AddFAQ extends React.Component {
  constructor(props, context) {
    super(props, context);

  }
  cb(response) {
    // Back to categories list
    toastr.removeByType("success");
    toastr.success("", "Thêm mới thành công")
    this.props.history.push('/faqs');
  }

  render() {
    return (
      <MainLayout>
        <div>
          <div className="register-logo">
            <b>Thêm Hỏi Đáp</b>
          </div>
          <FAQForm fnSubmit={FAQs.actions.add} cb={this.cb.bind(this)}/>
        </div>
      </MainLayout>
    );
  }
}

AddFAQ.contextTypes = {
  router: React.PropTypes.object
};

export default AddFAQ;
