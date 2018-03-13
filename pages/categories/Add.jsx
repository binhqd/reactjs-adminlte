import React from 'react';
import {MainLayout} from 'components/layouts';
import {CategoryForm} from 'components/category';
import {Categories} from 'base/api';
import {toastr} from 'react-redux-toastr';
import { withRouter } from 'react-router-dom';

class AddCategory extends React.Component {
  constructor(props, context) {
    super(props, context);

  }
  cb(response) {
    // Back to categories list
    toastr.success('Thành công!', 'Danh mục đã được thêm thành công.');

    this.props.history.push('/categories');
  }

  render() {
    return (
      <MainLayout>
        <div>
          Thêm mới danh mục
          <CategoryForm fnSubmit={Categories.actions.add} cb={this.cb.bind(this)}/>
        </div>
      </MainLayout>
    );
  }
}

export default withRouter(AddCategory);
