import React from 'react';
import {MainLayout} from 'components/layouts';
import {ProductForm} from 'components/products';
import {Products} from 'base/api';
import {toastr} from 'react-redux-toastr';

class EditProduct extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      product: {}
    }
  }

  cb(response) {
    // Back to categories list
    // do aprrove
    Products.actions.approve.request({id: response.data.id}).then(end => {
      toastr.removeByType("success");
      toastr.success("", "Cập nhật thành công")
      this.props.history.push(`/business/${response.data.businessId}/products`);
    });

  }

  componentDidMount() {
    Products.actions.get.request({id: this.props.match.params.id}).then(response => {
      this.setState({
        product: response.data
      })
    })
  }

  render() {
    return (
      <MainLayout>
        <div>
          <div className="register-logo">
            <b>Cập nhật sản phẩm</b>
          </div>
          <ProductForm fnSubmit={Products.actions.update} cb={this.cb.bind(this)} data={this.state.product}/>
        </div>
      </MainLayout>
    );
  }
}

EditProduct.contextTypes = {
  router: React.PropTypes.object
};

export default EditProduct;
