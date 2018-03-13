import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {Link} from 'react-router-dom';
import {Requests} from 'base/api';
import {Request} from 'components/requests';
import {toastr} from 'react-redux-toastr';
import ReactPaginate from 'react-paginate';
import {connect} from 'react-redux';

class ListRequests extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      requests: [],
      pageCount: 0,
      offset: 0,
      total: 0,
      items: {},
      selected: 0
    }

  }

  componentDidMount() {
    let fnCountStatus = 0;
    switch (this.props.status) {
      case 'CLOSED':
        fnCountStatus = 1;
        break;
      default:
        fnCountStatus = 0;
    }

    Requests.actions.count.request().then(response => {;
      this.setState({
        total: response.data.total
      });
      this.loadRequests();
    });
  }

  loadRequests() {
    Requests.actions.list.request({
      filter: {
        skip: this.state.offset,
        limit: this.props.limit,
        include: ['product', 'user'],
        order: 'createdAt DESC'
      }

    }).then(response => {
      this.postLoadRequests(response.data);
    });
  }

  postLoadRequests(requests) {
    this.setState({
      requests
    });

    let itemKeys = {};
    requests.map(item => {
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
      this.loadRequests();
    });
  };

  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th className='col-lg-1'>
              Sản phẩm
            </th>
            <th className='col-lg-2'>Người đăng</th>
            <th className='col-lg-4'>Nội dung</th>

            <th className='col-lg-2'>Đăng lúc</th>
            <th className='col-lg-2'>Hành động</th>
          </tr>
        </thead>
        {
          this.state.requests.map((item, i) => {

            return (
              <Request {...item} className='' index={(i + 1 + ((this.state.selected) * this.props.limit))}
                actionPanel={this.props.actionPanel(item, this.loadRequests.bind(this))}
              />
            );
          })
        }
        <tfoot>
          <tr>
            <td colSpan='6'>
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

ListRequests.PropTypes = {
  status: PropTypes.oneOf(['PENDING', 'CLOSED']),
  limit: PropTypes.number
}

ListRequests.defaultProps = {
  status: 'PENDING',
  limit: 30,
  actionPanel: function(item, reload) {}
}

export default connect()(ListRequests);
