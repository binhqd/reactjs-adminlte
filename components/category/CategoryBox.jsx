import React from 'react';
import {Link} from 'react-router-dom';
import {store} from 'base/reducers';
import {Categories} from 'api';
import CONFIG from 'base/constants/config';

class CategoryBox extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  handleDelete(catID, e) {
    if (confirm("Bạn có muốn xóa danh mục này không? Sau khi xóa, các sản phẩm và doanh nghiệp thuộc về  danh mục này sẽ không truy cập được")) {
      store.dispatch(Categories.actions.delete({ id: catID })).then(response => {
        // store.dispatch({
        //   type: 'REMOVE_CATEGORY',
        //   id: catID
        // });
        store.dispatch(Categories.actions.list());
      });
    }
  }

  goEdit(id) {
    this.props.history.push(`/categories/edit/${id}`);
  }

  render() {
    let img = require('assets/images/placeholder-128.jpg');

    if (this.props.data.logo) {
      img = `${CONFIG.staticURL}/category-logos/${this.props.data.logo}`;
    }

    return (
      <div className="media">
        <h4>{this.props.data.name}
          <Link to={`/categories/edit/${this.props.data.id}`} className="btn-actions"><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></Link> &nbsp;
          <a onClick={this.handleDelete.bind(this, this.props.data.id)} className="btn-actions"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
        </h4>

        <div className="media-body">
          <p>{this.props.data.description}</p>
        </div>

        {
          (this.props.data.children && this.props.data.children.length > 0) ? (
            this.props.data.children.map(item => {
              return (
                <div className="category-children" style={{clear: 'both'}}>
                  <CategoryBox key={item.id} data={item}/>
                </div>
              );
            })
          )

           : ''
        }
      </div>
    );
  }
}

export default CategoryBox;
