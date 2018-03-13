import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {Link} from 'react-router-dom';
import {Businesses, Products} from 'base/api';
import {BusinessInfo} from 'components/business';
import {Product} from 'components/products';
import {toastr} from 'react-redux-toastr';

class ListProducts extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      business: {
        id: this.props.match.params.id
      },
      products: []
    }
  }

  loadProducts() {
    Businesses.actions.listProducts.request({id: this.props.match.params.id}).then(response => {
      this.setState({
        products: response.data
      })
    });
  }

  componentDidMount() {
    Businesses.actions.get.request({id: this.props.match.params.id}).then(response => {
      this.setState({
        business: response.data
      })
    });

    this.loadProducts();
  }

  confirmDelete(id) {
    if (confirm("Bạn có muốn xóa sản phẩm này không?")) {
      Products.actions.delete.request({id}).then(response => {
        toastr.removeByType('success');
        toastr.success("", "Sản phẩm đã được xóa thành công");

        this.loadProducts();
      });
    }
  }

  render() {
    return (
      <MainLayout>
        <div>
          <BusinessInfo key={this.state.business.id} data={this.state.business}/>
          <h3>Quản lý sản phẩm</h3>
          [ <Link to={`/business/${this.state.business.id}/products/add`}>Thêm sản phẩm mới</Link>]

          <section className="list-product-result container-fluid">
            {
              this.state.products.map((item, i) => {
                return (
                  <div className="product-wrap col-lg-3" key={i}>
                    <Product {...item} className=''/>
                    <div>
                      <Link to={`/products/edit/${item.id}`} className="btn-actions"><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></Link> &nbsp;
                      <a href='javascript:void(0)' onClick={this.confirmDelete.bind(this, item.id)} className="btn-actions"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
                    </div>
                  </div>
                );
              })
            }
          </section>

          [ <Link to={`/business/${this.state.business.id}/products/add`}>Thêm sản phẩm mới</Link>]
        </div>
      </MainLayout>
    );
  }

}

export default ListProducts;
