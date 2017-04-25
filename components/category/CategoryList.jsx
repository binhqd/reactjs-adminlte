import React from 'react';
import Categories from 'dummy/categories';
import {CategoryBox} from 'components/category';
import {connect} from 'react-redux';

class CategoryList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        {
          Categories.categories.map(item => {
            return <CategoryBox key={item.id} data={item}/>;
          })
        }
      </div>
    );
  }
}

export default connect()(CategoryList);
