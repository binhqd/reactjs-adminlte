import React from 'react';
// import Categories from 'dummy/categories';
import {CategoryBox} from 'components/category';
import {connect} from 'react-redux';
import {Categories} from 'base/api';

class CategoryList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    if (this.props.categoriesAsTree.length == 0) {
      this.props.dispatch(Categories.actions.list());
    }
  }

  render() {
    return (
      <div>
        {
          this.props.categoriesAsTree.map(item => {
            return <CategoryBox key={item.id} data={item}/>;
          })
        }
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    categoriesAsTree: state.categoriesAsTree
  };
}

export default connect(mapStateToProps)(CategoryList);
