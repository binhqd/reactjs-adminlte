import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {Link} from 'react-router-dom';
import {Products} from 'base/api';
import {Product} from 'components/products';
import {toastr} from 'react-redux-toastr';
import ReactPaginate from 'react-paginate';
import {connect} from 'react-redux';

class ListProducts extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      products: [],
      pageCount: 0,
      offset: 0,
      total: 0,
      items: {}
    }

    this.fnList = Products.actions.list.request;
  }

  componentDidMount() {
    let fnCount = Products.actions.countApproved.request;
    switch (this.props.status) {
      case 'AWAITING':
        this.fnList = Products.actions.listAwaiting.request;
        fnCount = Products.actions.countAwaiting.request;
        break;
      case 'REJECTED':
        this.fnList = Products.actions.listRejected.request;
        fnCount = Products.actions.countRejected.request;
        break;
      default:
        this.fnList = Products.actions.list.request;
        fnCount = Products.actions.countApproved.request;
    }

    fnCount().then(response => {;

      this.setState({
        total: response.data.total
      });
      this.loadProducts();
    });
  }

  loadProducts() {
    this.fnList({offset: this.state.offset, limit: this.props.limit}).then(response => {
      this.postLoadProducts(response.data);
    });
  }

  postLoadProducts(products) {
    this.setState({
      products
    });

    let itemKeys = {};
    products.map(item => {
      itemKeys[item.id] = item;
    });

    let pageCount = Math.ceil(this.state.total / this.props.limit);
    this.setState({
      items: itemKeys,
      pageCount
    });


  }


  handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.props.limit);

    this.setState({offset: offset}, () => {
      this.loadProducts();
    });
  };

  confirmDelete(id) {
    if (confirm("Bạn có muốn xóa sản phẩm này không?")) {
      Products.actions.delete.request({id}).then(response => {
        this.loadProducts();
      });
    }
  }

  updateField(item, fieldName, e) {
    Products.actions.update.request({id: item.id}, {
      data: {
        [fieldName]: !item[fieldName]
      }
    }).then(response => {
      Products.actions.approve.request({id: item.id}).then(end => {
        toastr.removeByType('success');
        toastr.success("Thành công", "Trạng thái của sản phẩm được cập nhật thành công");

        this.setState({
          items: {
            ...this.state.items,
            [this.state.items[item.id].id]: {
              ...this.state.items[item.id],
              [fieldName]: !this.state.items[item.id][fieldName]
            }
          }
        });
      });
    })
  }

  render() {
    return (
      <div className="container-fluid">
        <section className="list-product-result container-fluid">
          {
            this.state.products.map((item, i) => {

              return (
                <div className="product-wrap col-lg-3" key={i} style={{marginBottom: 10}}>
                  <Product {...item} className=''
                    showButtonPanel={true}
                    confirmDelete={this.confirmDelete.bind(this)}
                  />
                  {this.props.actionPanel(item, this.loadProducts.bind(this))}
                </div>
              );
            })
          }
        </section>
        <ReactPaginate previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={<a href="">...</a>}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"} />
      </div>
    );
  }

}

ListProducts.PropTypes = {
  status: PropTypes.oneOf(['AWAITING', 'APPROVED', 'REJECTED']),
  limit: PropTypes.number
}

ListProducts.defaultProps = {
  status: 'APPROVED',
  limit: 20,
  actionPanel: function(item, reload) {}
}

export default connect()(ListProducts);
