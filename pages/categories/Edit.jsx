import React from 'react';
import {MainLayout} from 'components/layouts';
import {CategoryForm} from 'components/category';
import {Categories} from 'base/api';
import { browserHistory } from 'react-router'

class EditCategory extends React.Component {
  constructor(props, context) {
    super(props, context);

  }

  cb(response) {
    // Back to categories list
    browserHistory.push('/categories');
  }

  render() {
    return (
      <MainLayout>
        <div>
          Edit Category
          <CategoryForm fnSubmit={Categories.actions.update} cb={this.cb.bind(this)} categoryId={this.props.params.id}/>
        </div>
      </MainLayout>
    );
  }
}

export default EditCategory;
