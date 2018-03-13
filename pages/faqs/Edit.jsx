import React from 'react';
import {MainLayout} from 'components/layouts';
import FAQForm from 'components/faq/FAQForm.jsx';
import {FAQs} from 'base/api';
import {toastr} from 'react-redux-toastr';

class EditFAQ extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      faq: {}
    }
  }

  cb(response) {
    // Back to categories list
    toastr.removeByType("success");
    toastr.success("", "Cập nhật thành công")
    this.props.history.push('/faqs');
  }

  componentDidMount() {
    FAQs.actions.get.request({id: this.props.match.params.id}).then(response => {
      this.setState({
        faq: response.data
      })
    })
  }

  render() {
    return (
      <MainLayout>
        <div>
          <div className="register-logo">
            <b>Cập nhật Hỏi Đáp</b>
          </div>
          <FAQForm fnSubmit={FAQs.actions.update} cb={this.cb.bind(this)} data={this.state.faq}/>
        </div>
      </MainLayout>
    );
  }
}

EditFAQ.contextTypes = {
  router: React.PropTypes.object
};

export default EditFAQ;
