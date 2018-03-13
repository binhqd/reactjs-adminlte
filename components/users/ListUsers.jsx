import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {Link} from 'react-router-dom';
import {Users} from 'base/api';
import {User} from 'components/users';
import {toastr} from 'react-redux-toastr';
import ReactPaginate from 'react-paginate';
import {connect} from 'react-redux';

class ListUsers extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      users: [],
      pageCount: 0,
      offset: 0,
      total: 0,
      items: {},
      selected: 0,
      searchTerm: ''
    }

    this.fnList = Users.actions.list.request;
  }

  componentDidMount() {
    let fnCount = Users.actions.count.request;
    switch (this.props.status) {
      case 'MODERATOR':
        this.fnList = Users.actions.listClosed.request;
        fnCount = Users.actions.countClosed.request;
        break;
      default:
        this.fnList = Users.actions.list.request;
        fnCount = Users.actions.count.request;
    }

    fnCount().then(response => {;

      this.setState({
        total: response.data.total
      });
      this.loadUsers();
    });
  }

  loadUsers() {
    let search = this.state.searchTerm || '.*';
    Users.actions.list.request({
      filter: {
        skip: this.state.offset,
        limit: this.props.limit,
        order: 'createdAt DESC',
        where: {
          fullname: {
            regexp: `${search}`
          }
        }
      }

    }).then(response => {
      this.postLoadUsers(response.data);
    });
  }

  postLoadUsers(users) {
    this.setState({
      users
    });

    let itemKeys = {};
    users.map(item => {
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
      this.loadUsers();
    });
  };

  handleSearch(e) {
    let value = e.target.value;

    this.setState({
      searchTerm: e.target.value
    });

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      Users.actions.count.request({
        where: {
          fullname: {
            regexp: `/${encodeURIComponent(this.state.searchTerm || '.*')}/i`
          }
        }
      }).then(response => {;
        this.setState({
          total: response.data.total
        });
        this.loadUsers();
      });
    }, 1000);

  }

  render() {
    return (
      <div>
        <div className="form-group">
          <label>Tìm người dùng theo tên</label>
          <input type="text" className="form-control" value={this.state.searchTerm} placeholder="Business Name" onChange={this.handleSearch.bind(this)}/>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Avatar</th>
              <th>
                Thông tin
              </th>
              <th>Ngày tạo</th>
              <th>Hành động</th>
            </tr>
          </thead>
          {
            this.state.users.map((item, i) => {

              return (
                <User {...item} className='' index={(i + 1 + ((this.state.selected) * this.props.limit))}
                  actionPanel={this.props.actionPanel(item, this.loadUsers.bind(this))}
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
      </div>
    );
  }
}

ListUsers.PropTypes = {
  status: PropTypes.oneOf(['MODERATOR', 'NORMAL']),
  limit: PropTypes.number
}

ListUsers.defaultProps = {
  status: 'NORMAL',
  limit: 30,
  actionPanel: function(item, reload) {}
}

export default connect()(ListUsers);
