import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {Link} from 'react-router-dom';
import {Contacts} from 'base/api';
import {Contact} from 'components/contacts';
import {toastr} from 'react-redux-toastr';
import ReactPaginate from 'react-paginate';
import {connect} from 'react-redux';

class ListContacts extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      contacts: [],
      pageCount: 0,
      offset: 0,
      total: 0,
      items: {}
    }

    this.fnList = Contacts.actions.list.request;
  }

  componentDidMount() {
    let fnCount = Contacts.actions.count.request;
    switch (this.props.status) {
      case 'CLOSED':
        this.fnList = Contacts.actions.listClosed.request;
        fnCount = Contacts.actions.countClosed.request;
        break;
      default:
        this.fnList = Contacts.actions.list.request;
        fnCount = Contacts.actions.count.request;
    }

    fnCount().then(response => {;

      this.setState({
        total: response.data.count
      });
      this.loadContacts();
    });
  }

  loadContacts() {
    this.fnList({offset: this.state.offset, limit: this.props.limit}).then(response => {
      this.postLoadContacts(response.data);
    });
  }

  postLoadContacts(contacts) {
    this.setState({
      contacts
    });

    let itemKeys = {};
    contacts.map(item => {
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
      this.loadContacts();
    });
  };

  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Người gửi</th>
            <th>Nội dung</th>
            <th>Hành động</th>
          </tr>
        </thead>
        {
          this.state.contacts.map((item, i) => {

            return (
              <Contact {...item} className='' index={i}
                actionPanel={this.props.actionPanel(item, this.loadContacts.bind(this))}
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

ListContacts.PropTypes = {
  status: PropTypes.oneOf(['PENDING', 'CLOSED']),
  limit: PropTypes.number
}

ListContacts.defaultProps = {
  status: 'PENDING',
  limit: 20,
  actionPanel: function(item, reload) {}
}

export default connect()(ListContacts);
