import React from 'react';
// import FAQs from 'dummy/categories';
import {FAQBox} from 'components/faq';
import {connect} from 'react-redux';
import {FAQs} from 'base/api';
import {toastr} from 'react-redux-toastr';

class FAQList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      listFAQs: [],
      items: {}
    }
  }

  postFetch(faqs) {
    let itemKeys = {};
    faqs.map(item => {
      itemKeys[item.id] = item;
    });

    this.setState({
      listFAQs: faqs,
      items: itemKeys
    })
  }

  loadFAQs() {
    FAQs.actions.list.request({
      filter: {
        limit: 1000
      }
    }).then(response => {
      this.postFetch(response.data);
    });
  }

  componentDidMount() {
    this.loadFAQs();
  }

  afterDelete() {
    toastr.removeByType("success");
    toastr.success("", "Xóa thành công")
    this.loadFAQs();
  }

  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th className='col-lg-9'>Hỏi & Đáp</th>
            <th className='col-lg-2'>Hành động</th>
          </tr>
        </thead>
        {
          this.state.listFAQs.map((faq, i) => {

            return (
              <FAQBox key={faq.id} data={faq}
                deleteCallBack={this.afterDelete.bind(this)}
                index={(i + 1)}
                actionPanel={this.props.actionPanel(faq, this.loadFAQs.bind(this))}
              />
            );
          })
        }

      </table>
    );
  }
}

export default connect()(FAQList);
