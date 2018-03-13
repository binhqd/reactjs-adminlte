import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {Link} from 'react-router-dom';
import {Demands} from 'base/api';
import {Demand} from 'components/demands';
import {toastr} from 'react-redux-toastr';
import ReactPaginate from 'react-paginate';
import {connect} from 'react-redux';

class ListDemands extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      demands: [],
      pageCount: 0,
      offset: 0,
      total: 0,
      items: {},
      selected: 0
    }

    this.fnList = Demands.actions.list.request;
  }

  componentDidMount() {
    let fnCount = Demands.actions.count.request;
    switch (this.props.status) {
      case 'CLOSED':
        this.fnList = Demands.actions.listClosed.request;
        fnCount = Demands.actions.countClosed.request;
        break;
      default:
        this.fnList = Demands.actions.list.request;
        fnCount = Demands.actions.count.request;
    }

    fnCount().then(response => {;

      this.setState({
        total: response.data.count
      });
      this.loadDemands();
    });
  }

  loadDemands() {
    this.fnList({offset: this.state.offset, limit: this.props.limit}).then(response => {
      this.postLoadDemands(response.data);
    });
  }

  postLoadDemands(demands) {
    this.setState({
      demands
    });

    let itemKeys = {};
    demands.map(item => {
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
      this.loadDemands();
    });
  };

  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th className='col-lg-3'>Người đăng</th>
            <th className='col-lg-4'>Nội dung</th>
            <th className='col-lg-2'>Đăng lúc</th>
            <th className='col-lg-2'>Hành động</th>
          </tr>
        </thead>
        {
          this.state.demands.map((item, i) => {

            return (
              <Demand {...item} className='' index={(i + 1 + ((this.state.selected) * this.props.limit))}
                actionPanel={this.props.actionPanel(item, this.loadDemands.bind(this))}
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

ListDemands.PropTypes = {
  status: PropTypes.oneOf(['PENDING', 'CLOSED']),
  limit: PropTypes.number
}

ListDemands.defaultProps = {
  status: 'PENDING',
  limit: 20,
  actionPanel: function(item, reload) {}
}

export default connect()(ListDemands);
