import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {Link} from 'react-router-dom';
import {Orders} from 'base/api';
import {Order} from 'components/orders';
import {toastr} from 'react-redux-toastr';
import ReactPaginate from 'react-paginate';
import {connect} from 'react-redux';

class ListOrders extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      orders: [],
      pageCount: 0,
      offset: 0,
      total: 0,
      items: {},
      selected: 0
    }
  }

  componentDidMount() {
    switch (this.props.status) {
      case 'CLOSED':
        this.findStatus = 1;
        break;
      case 'CANCELLED':
        this.findStatus = 2;
        break;
      default:
        this.findStatus = 0;
    }

    Orders.actions.count.request({
        where: {
          status: this.findStatus
        }
    }).then(response => {;

      this.setState({
        total: response.data.count
      });
      this.loadOrders(this.findStatus);
    });
  }

  loadOrders(status) {
    Orders.actions.list.request({
      filter: {
        skip: this.state.offset,
        limit: this.props.limit,
        order: 'createdAt ASC',
        where: {
          status
        },
        include: 'user'
      }
    }).then(response => {
      this.postLoadOrders(response.data);
    });
  }

  postLoadOrders(orders) {
    this.setState({
      orders
    });

    let itemKeys = {};
    orders.map(item => {
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

    this.setState({
      offset: offset,
      selected
    }, () => {
      this.loadOrders(this.findStatus);
    });
  };

  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th className="col-lg-4">Người đặt hàng</th>
            <th className="col-lg-2">Ngày đặt</th>
            <th className="col-lg-2">Tổng tiền</th>
            <th className="col-lg-3">Hành động</th>
          </tr>
        </thead>
        {
          this.state.orders.map((item, i) => {
            return (
              <Order {...item} className='' index={(i + 1 + ((this.state.selected) * this.props.limit))}
                actionPanel={this.props.actionPanel(item, this.loadOrders.bind(this))}
              />
            );
          })
        }
        <tfoot>
          <tr>
            <td colSpan='5'>
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
            </td>
          </tr>
        </tfoot>

      </table>
    );
  }
}

ListOrders.PropTypes = {
  status: PropTypes.oneOf(['PENDING', 'CLOSED', 'CANCELLED']),
  limit: PropTypes.number
}

ListOrders.defaultProps = {
  status: 'PENDING',
  limit: 20,
  actionPanel: function(item, reload) {}
}

export default connect()(ListOrders);
