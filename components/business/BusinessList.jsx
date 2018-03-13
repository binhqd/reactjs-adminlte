import React from 'react';
import {PropTypes} from 'prop-types';
// import Businesses from 'dummy/categories';
import {BusinessBox} from 'components/business';
import {connect} from 'react-redux';
import {Businesses} from 'base/api';
import {CategoryParentList} from 'components/category';
import {CategorySelectorInput} from 'components/danangtrade-forms';
import ReactPaginate from 'react-paginate';
import {toastr} from 'react-redux-toastr';

class BusinessList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      items: {},
      businesses: [],
      total: 0,
      offset: 0,
      pageCount: 0,
      searchTerm: ''
    }

    this.fnCount = Businesses.actions.countApproved.request;
    this.findStatus = 1;
  }

  componentDidMount() {

    switch (this.props.status) {
      case 'AWAITING':
        this.findStatus = 0;
        this.fnCount = Businesses.actions.countAwaiting.request;
        break;
      case 'REJECTED':
        this.findStatus = 2;
        this.fnCount = Businesses.actions.countRejected.request;
        break;
      default:
        this.findStatus = 1;
        this.fnCount = Businesses.actions.countApproved.request;
    }

    this.fnCount({q: '.*'}).then(response => {;

      this.setState({
        total: response.data.total
      });
      this.loadBusinessesFromServer(this.findStatus);
    });


  }

  loadBusinessesFromServer(status) {
    Businesses.actions.list.request({
      filter: {
        limit: this.props.limit,
        skip: this.state.offset,
        order: 'createdAt DESC',
        where: {
          status: status,
          name: {
            regexp: `/${this.state.searchTerm}/i`
          }
        }
      }
    }).then(response => {
      this.postLoadBusinesses(response.data);
    });
  }

  postLoadBusinesses(businesses) {
    this.props.dispatch({
      type: 'UPDATE_BUSINESSES_LIST',
      businesses: businesses
    });

    let itemKeys = {};
    businesses.map(item => {
      itemKeys[item.id] = item;
    });

    let pageCount = Math.ceil(this.state.total / this.props.limit);
    this.setState({
      items: itemKeys,
      pageCount
    });


  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listBusinesses != this.state.listBusinesses) {
      this.setState({
        listBusinesses: nextProps.listBusinesses,
        businesses: nextProps.listBusinesses,
      });
    }
  }

  slugify(s, opt) {
    s = String(s);
    opt = Object(opt);

    var defaults = {
      'delimiter': ' ',
      'limit': undefined,
      'lowercase': true,
      'replacements': {},
      'transliterate': (typeof(XRegExp) === 'undefined') ? true : false
    };

    // Merge options
    for (var k in defaults) {
      if (!opt.hasOwnProperty(k)) {
        opt[k] = defaults[k];
      }
    }

    var char_map = {
      // Latin
      'Ấ': 'A', 'Ấ': 'A', 'Ầ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ậ': 'A', 'Â': 'A',
      'Ă': 'A', 'Ắ': 'A', 'Ằ': 'A', 'Ẳ': 'A', 'Ẵ': 'A', 'Ặ': 'A',
      'Á': 'A', 'À': 'A', 'Ả': 'A', 'Ã': 'A', 'Ạ': 'A',
      'á': 'a', 'à': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
      'ă': 'a', 'ắ': 'a', 'ằ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
      'â': 'a', 'ấ': 'a', 'ầ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',

      'Ó': 'O', 'Ò': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ọ': 'O',
      'Ô': 'O', 'Ố': 'O', 'Ồ': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ộ': 'O',
      'Ơ': 'O', 'Ờ': 'O', 'Ở': 'O', 'Ỡ': 'O', 'Ợ': 'O', 'Ớ': 'O',
      'ó': 'o', 'ò': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
      'ô': 'o', 'ố': 'o', 'ồ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
      'ơ': 'o', 'ớ': 'o', 'ờ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',

      'Ú': 'U', 'Ù': 'U', 'Ủ': 'U', 'Ủ': 'U', 'Ụ': 'U',
      'Ư': 'U', 'Ứ': 'U', 'Ừ': 'U', 'Ử': 'U', 'Ữ': 'U', 'Ự': 'U',
      'ú': 'u', 'ù': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
      'ư': 'u', 'ứ': 'u', 'ừ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',

      'Í': 'I', 'Ì': 'I', 'Ỉ': 'I', 'Ĩ': 'I', 'Ị': 'I',
      'í': 'i', 'ì': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',

      'Ý': 'Y', 'Ỳ': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y', 'Ỵ': 'Y',
      'ý': 'y', 'ỳ': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',

      'É': 'E', 'È': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ẹ': 'E',
      'Ê': 'E', 'Ế': 'E', 'Ề': 'E', 'Ể': 'E', 'Ễ': 'E', 'Ệ': 'E',
      'é': 'e', 'è': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
      'ế': 'e', 'ề': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e', 'ê': 'e'

    };

    // Make custom replacements
    for (var k in opt.replacements) {
      s = s.replace(RegExp(k, 'g'), opt.replacements[k]);
    }

    // Transliterate characters to ASCII
    if (opt.transliterate) {
      for (var k in char_map) {
        s = s.replace(RegExp(k, 'g'), char_map[k]);
      }
    }

    // Replace non-alphanumeric characters with our delimiter
    var alnum = (typeof(XRegExp) === 'undefined') ? RegExp('[^a-z0-9]+', 'ig') : XRegExp('[^\\p{L}\\p{N}]+', 'ig');
    s = s.replace(alnum, opt.delimiter);

    // Remove duplicate delimiters
    s = s.replace(RegExp('[' + opt.delimiter + ']{2,}', 'g'), opt.delimiter);

    // Truncate slug to max. characters
    s = s.substring(0, opt.limit);

    // Remove delimiter from ends
    s = s.replace(RegExp('(^' + opt.delimiter + '|' + opt.delimiter + '$)', 'g'), '');

    return opt.lowercase ? s.toLowerCase() : s;
  }

  handleFilter(catID) {
    this.setState({
      selectedCatID: catID
    });

    Businesses.actions.filterByCat.request({catID: catID}).then(response => {
      this.postLoadBusinesses(response.data);
    })
  }

  handleSearch(e) {
    let value = e.target.value;

    this.setState({
      searchTerm: e.target.value
    });

    if (this.timeout) {
      clearTimeout(this.timeout);
    }


    this.timeout = setTimeout(() => {
      this.fnCount({q: this.state.searchTerm}).then(response => {;

        this.setState({
          total: response.data.total
        });
        this.loadBusinessesFromServer(this.findStatus);
      });
    }, 1000);

  }

  selectCategories(cat) {
    // console.log(cat);
    this.handleFilter(cat.value)
  }

  handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.props.limit);

    this.setState({offset: offset}, () => {
      this.loadBusinessesFromServer(this.findStatus);
    });
  };

  updateField(item, fieldName, e) {
    Businesses.actions.update.request({id: item.id}, {
      data: {
        [fieldName]: !item[fieldName]
      }
    }).then(response => {
      Businesses.actions.approve.request({id: item.id}).then(end => {
        toastr.removeByType('success');
        toastr.success("Thành công", "Trạng thái của doanh nghiệp đã được cập nhật thành công");

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
      <div className='container-fluid'>
        {/* <CategorySelectorInput label="Chọn lĩnh vực kinh doanh" data={{}}
          onChange={this.selectCategories.bind(this)}
          multi={false}
          stayOpen={false}
        /> */}

        <div className="form-group">
          <label>Lọc doanh nghiệp theo tên</label>
          <input type="text" className="form-control" value={this.state.searchTerm} placeholder="Business Name" onChange={this.handleSearch.bind(this)}/>
        </div>
        <div className="container-fluid">
          {
            this.state.businesses.map(business => {
              return (
                <div className='col-lg-6' style={{minHeight: 300}}>
                  <BusinessBox key={business.id} data={business}/>
                  <div className='row'>

                    <input type='checkbox' checked={this.state.items[business.id] && this.state.items[business.id].status} id={`status_${business.id}`} onChange={this.updateField.bind(this, business, 'status')}/> <label htmlFor={`status_${business.id}`}>Đã kiểm duyệt</label>
                  </div>
                </div>
              );
            })
          }
        </div>
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

const mapStateToProps = function(state) {
  return {
    listBusinesses: state.listBusinesses
  };
}

BusinessList.PropTypes = {
  status: PropTypes.oneOf(['AWAITING', 'APPROVED', 'REJECTED']),
  limit: PropTypes.number
}

BusinessList.defaultProps = {
  status: 'APPROVED',
  limit: 10
}

export default connect(mapStateToProps)(BusinessList);
