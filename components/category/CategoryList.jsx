import React from 'react';
// import Categories from 'dummy/categories';
import {CategoryBox} from 'components/category';
import {connect} from 'react-redux';
import {Categories} from 'base/api';

class CategoryList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.props.dispatch(Categories.actions.list());
  }

  render() {
    return (
      <div>
        {
          this.props.categories.map(item => {
            return <CategoryBox key={item.id} data={item}/>;
          })
        }
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    categories: typeof state.list.data.data != "undefined" ? state.list.data.data : []
  };
}

export default connect(mapStateToProps)(CategoryList);
