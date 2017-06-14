import React from 'react';
import {Link} from 'react-router';
import {store} from 'base/routes';
import {Categories} from 'api';

class CategoryBox extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  handleDelete(catID, e) {
    if (confirm("Are you sure to delete this category?")) {
      store.dispatch(Categories.actions.delete({ id: catID })).then(response => {
        // store.dispatch({
        //   type: 'REMOVE_CATEGORY',
        //   id: catID
        // });
        store.dispatch(Categories.actions.list());
      });
    }
  }

  render() {
    let img = require('assets/images/placeholder-128.jpg');

    if (this.props.data.logo) {
      img = `http://localhost:3000/category-logos/${this.props.data.logo}`;
    }

    return (
      <div className="media">
        <h3>{this.props.data.name}
          <Link to={`/categories/edit/${this.props.data.id}`}><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></Link> &nbsp;
          <a onClick={this.handleDelete.bind(this, this.props.data.id)}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a></h3>
        {
          <div className="media-left media-middle">
          <a href="#">
            <img className="media-object" src={img} alt="..." width="64" height="64"/>
          </a>
        </div>
        }
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
