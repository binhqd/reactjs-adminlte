import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {FAQList} from 'components/faq';
import {Link, withRouter} from 'react-router-dom';
import {toastr} from 'react-redux-toastr';
import {FAQs} from 'base/api';

class ListFAQs extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  goDetail(id) {
    this.props.history.push(`/faqs/${id}`)
  }


  confirmDelete(id, reload) {
    if (confirm("Bạn có muốn xóa hỏi đáp này không?")) {
      FAQs.actions.delete.request({id}).then(response => {
        toastr.removeByType('success');
        toastr.success("", "Hỏi đáp đã được xóa");
        reload();
      });
    }
  }
  render() {
    return (
      <MainLayout>
        <div>
          <h1>Quản lý Hỏi Đáp</h1>
          [ <Link to="faqs/add">Thêm Hỏi Đáp mới</Link>]
          <FAQList
            actionPanel={(item, reload) => {
              return (
                <div>
                  <div className='row'>
                    <button className="btn btn-primary" type="button" onClick={this.goDetail.bind(this, item.id)}>Chi tiết</button>&nbsp;
                    <button className="btn btn-danger" type="button" onClick={this.confirmDelete.bind(this, item.id, reload)}>Xóa</button>
                  </div>
                </div>
              )
            }}
          />
        </div>
      </MainLayout>
    );
  }
}

export default ListFAQs;
