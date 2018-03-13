import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {Link} from 'react-router-dom';
import {Subscriptions} from 'base/api';
import {Subscription} from 'components/subscriptions';
import {toastr} from 'react-redux-toastr';
import ReactPaginate from 'react-paginate';
import {connect} from 'react-redux';

class ListSubscriptions extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      subscriptions: [],
      pageCount: 0,
      offset: 0,
      total: 0,
      items: {},
      selected: 0
    }

  }

  componentDidMount() {
    switch (this.props.status) {
      case 'VERIFIED':
      default:
        // nothing
    }

    Subscriptions.actions.count.request({
      where: {
        isVerified: false
      }
    }).then(response => {;

      this.setState({
        total: response.data.count
      });
      this.loadSubscriptions();
    });
  }

  loadSubscriptions(isVerified = false) {
    Subscriptions.actions.list.request({
      skip: this.state.offset,
      limit: this.props.limit,
      filter: {
        where: {
          isVerified
        },
        order: 'createdAt DESC'
      }
    }).then(response => {
      this.postLoadSubscriptions(response.data);
    });
  }

  postLoadSubscriptions(subscriptions) {
    this.setState({
      subscriptions
    });

    let itemKeys = {};
    subscriptions.map(item => {
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
      this.loadSubscriptions();
    });
  };

  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th className='col-lg-7'>Email</th>
            <th className='col-lg-2'>Ngày đăng ký</th>
            <th className='col-lg-2'>Hành động</th>
          </tr>
        </thead>
        {
          this.state.subscriptions.map((item, i) => {

            return (
              <Subscription {...item} className='' index={(i + 1 + ((this.state.selected) * this.props.limit))}
                actionPanel={this.props.actionPanel(item, this.loadSubscriptions.bind(this))}
              />
            );
          })
        }
        <tfoot>
          <tr>
            <td colSpan='4'>
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

ListSubscriptions.PropTypes = {
  status: PropTypes.oneOf(['PENDING', 'CLOSED']),
  limit: PropTypes.number
}

ListSubscriptions.defaultProps = {
  status: 'PENDING',
  limit: 20,
  actionPanel: function(item, reload) {}
}

export default connect()(ListSubscriptions);
