import React from 'react';
// import ArticleCategories from 'dummy/categories';
import {ArticleCategoryBox} from 'components/article-category';
import {connect} from 'react-redux';
import {ArticleCategories} from 'base/api';
import {toastr} from 'react-redux-toastr';

class ArticleCategoryList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      listArticleCategories: [],
      items: {}
    }
  }

  loadArticleCategories() {
    ArticleCategories.actions.list.request().then(response => {
      let itemKeys = {};
      response.data.map(item => {
        itemKeys[item.id] = item;
      });

      this.setState({
        listArticleCategories: response.data,
        items: itemKeys
      })
    });
  }

  componentDidMount() {
    this.loadArticleCategories();
  }

  afterDelete() {
    toastr.removeByType("success");
    toastr.success("", "Xóa thành công")
    this.loadArticleCategories();
  }

  render() {
    return (
      <div className='container-fluid'>
        {
          this.state.listArticleCategories.map(category => {
            return (
              <div className='col-lg-11'>
                <ArticleCategoryBox key={category.id} data={category}
                  deleteCallBack={this.afterDelete.bind(this)}/>

              </div>
            );
          })
        }
      </div>
    );
  }
}

export default connect()(ArticleCategoryList);
