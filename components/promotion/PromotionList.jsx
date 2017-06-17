import React from 'react';
// import Promotions from 'dummy/categories';
import {PromotionBox} from 'components/promotion';
import {connect} from 'react-redux';
import {Promotions} from 'base/api';
import {CategoryParentList} from 'components/category';

class PromotionList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {

    }

    Promotions.actions.list.request().then(response => {
      this.props.dispatch({
        type: 'UPDATE_PROMOTION_LIST',
        promotions: response.data
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
    Promotions.actions.filterByCat.request({catID: catID}).then(response => {
      this.props.dispatch({
        type: 'UPDATE_PROMOTION_LIST',
        promotions: response.data
      })
    })
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <label>Lọc khuyến mãi theo danh mục:</label>
          <CategoryParentList rootCatName='Tất cả lĩnh vực' parentCategory={this.state.selectedCatID} showAll={true} onChange={this.handleFilter.bind(this)}/>
        </div>
        {
          this.props.listPromotions.map(promotion => {
            return <PromotionBox key={promotion.id} data={promotion}/>;
          })
        }
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    listPromotions: state.listPromotions
  };
}

export default connect(mapStateToProps)(PromotionList);
