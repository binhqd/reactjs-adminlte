import React from 'react';
// import Businesses from 'dummy/categories';
import {BusinessBox} from 'components/business';
import {connect} from 'react-redux';
import {Businesses} from 'base/api';
import {CategoryParentList} from 'components/category';

class BusinessList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {

    }

    Businesses.actions.list.request().then(response => {
      this.props.dispatch({
        type: 'UPDATE_BUSINESSES_LIST',
        businesses: response.data
      })
    });
  }

  handleFilter(catID) {
    this.setState({
      selectedCatID: catID
    });

    if (!catID){
      catID = ".*";
    }
    Businesses.actions.filterByCat.request({catID: catID}).then(response => {
      this.props.dispatch({
        type: 'UPDATE_BUSINESSES_LIST',
        businesses: response.data
      })
    })
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <label>Lọc doanh nghiệp theo danh mục:</label>
          <CategoryParentList rootCatName='Tất cả lĩnh vực' parentCategory={this.state.selectedCatID} showAll={true} onChange={this.handleFilter.bind(this)}/>
        </div>
        {
          this.props.listBusinesses.map(business => {
            return <BusinessBox key={business.id} data={business}/>;
          })
        }
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    listBusinesses: state.listBusinesses
  };
}

export default connect(mapStateToProps)(BusinessList);
