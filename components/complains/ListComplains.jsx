import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {Link} from 'react-router-dom';
import {Complains} from 'base/api';
import {Complain} from 'components/complains';
import {toastr} from 'react-redux-toastr';
import ReactPaginate from 'react-paginate';
import {connect} from 'react-redux';

class ListComplains extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      complains: [],
      pageCount: 0,
      offset: 0,
      total: 0,
      items: {}
    }

    this.fnList = Complains.actions.list.request;
  }

  componentDidMount() {
    let fnCount = Complains.actions.count.request;
    switch (this.props.status) {
      case 'CLOSED':
        this.fnList = Complains.actions.listClosed.request;
        fnCount = Complains.actions.countClosed.request;
        break;
      default:
        this.fnList = Complains.actions.list.request;
        fnCount = Complains.actions.count.request;
    }

    fnCount().then(response => {;

      this.setState({
        total: response.data.count
      });
      this.loadComplains();
    });
  }

  loadComplains() {
    this.fnList({offset: this.state.offset, limit: this.props.limit}).then(response => {
      this.postLoadComplains(response.data);
    });
  }

  postLoadComplains(complains) {
    this.setState({
      complains
    });

    let itemKeys = {};
    complains.map(item => {
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
      this.loadComplains();
    });
  };

  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Nội dung</th>
            <th>Hành động</th>
          </tr>
        </thead>
        {
          this.state.complains.map((item, i) => {

            return (
              <Complain {...item} className='' index={i}
                actionPanel={this.props.actionPanel(item, this.loadComplains.bind(this))}
              />
            );
          })
        }
        <tfoot>
          <tr>
            <td colSpan='3'>
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

ListComplains.PropTypes = {
  status: PropTypes.oneOf(['PENDING', 'CLOSED']),
  limit: PropTypes.number
}

ListComplains.defaultProps = {
  status: 'PENDING',
  limit: 20,
  actionPanel: function(item, reload) {}
}

export default connect()(ListComplains);
