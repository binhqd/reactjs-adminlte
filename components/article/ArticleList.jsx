import React from 'react';
// import Articles from 'dummy/categories';
import {ArticleBox} from 'components/article';
import {connect} from 'react-redux';
import {Articles} from 'base/api';
import {toastr} from 'react-redux-toastr';
import {ArticleCategorySelectorInput} from 'components/danangtrade-forms';

class ArticleList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      listArticles: [],
      items: {}
    }
  }

  postFetch(articles) {
    let itemKeys = {};
    articles.map(item => {
      itemKeys[item.id] = item;
    });

    this.setState({
      listArticles: articles,
      items: itemKeys
    })
  }

  loadArticles() {
    Articles.actions.list.request().then(response => {
      this.postFetch(response.data);
    });
  }

  componentDidMount() {
    this.loadArticles();
  }

  afterDelete() {
    toastr.removeByType("success");
    toastr.success("", "Xóa thành công")
    this.loadArticles();
  }

  updateField(item, fieldName, e) {
    Articles.actions.update.request({id: item.id}, {
      data: {
        [fieldName]: !item[fieldName]
      }
    }).then(response => {
      Articles.actions.approve.request({id: item.id}).then(end => {
        toastr.removeByType('success');
        toastr.success("Thành công", "Trạng thái của tin tức đã được cập nhật thành công");

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

  filterByCat(catID) {
    Articles.actions.filterByCat.request({catID}).then(response => {
      this.postFetch(response.data);
    })
  }

  selectCategory(catID) {
    this.setState({
      categoryId: catID
    });

    this.filterByCat(catID);
  }

  handleSearch(e) {
    let value = this.slugify(e.target.value);

    this.setState({
      searchTerm: e.target.value
    });


    let filter = this.state.listBusinesses.filter(item => {
      const name = this.slugify(item.name);
      return name.indexOf(value) != -1
    });

    this.setState({
      businesses: filter
    })
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='col-lg-5'>
          <ArticleCategorySelectorInput label="Chọn danh mục tin"
            onChange={this.selectCategory.bind(this)} data={this.state.categoryId}
          />
        </div>

        {
          this.state.listArticles.map(article => {
            return (
              <div className='col-lg-12'>
                <ArticleBox key={article.id} data={article}
                  deleteCallBack={this.afterDelete.bind(this)}/>

              </div>
            );
          })
        }
      </div>
    );
  }
}

export default connect()(ArticleList);
