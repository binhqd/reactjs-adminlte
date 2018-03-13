import React from 'react';
import {PropTypes} from 'prop-types';
import {MainLayout} from 'components/layouts';
import {Link} from 'react-router-dom';
import {Products} from 'base/api';
import {ProductForm} from 'components/products';
import {toastr} from 'react-redux-toastr';

class AddProduct extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      bizID: this.props.match.params.id
    }
  }

  cb(response) {
    toastr.removeByType("success");
    toastr.success('Thành công!', 'Sản phẩm đã được thêm thành công.');
    //
    this.props.history.push(`/business/${response.data.businessId}/products`);
  }

  render() {
    return (
      <MainLayout>
        <div>
          <Link to={`/business/${this.state.bizID}/products`}>Quay lại</Link>
          <h2 className='add-product-title'>Thêm sản phẩm mới</h2>
          <ProductForm bizID={this.state.bizID} fnSubmit={Products.actions.add} cb={this.cb.bind(this)}/>
        </div>
      </MainLayout>

    );
  }
}

export default AddProduct;
