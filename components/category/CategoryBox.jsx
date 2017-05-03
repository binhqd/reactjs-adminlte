import React from 'react';
import {Link} from 'react-router';

class CategoryBox extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const img = require('assets/images/placeholder-128.jpg');
    return (
      <div className="media">
        <h3>{this.props.data.name}</h3> [ <Link to={`/categories/edit/${this.props.data.id}`}>Edit</Link> | <Link to="">Delete</Link> ]
        <div className="media-left media-middle">
          <a href="#">
            <img className="media-object" src={img} alt="..." width="64" height="64"/>
          </a>
        </div>
        <div className="media-body">
          <p>{this.props.data.description}</p>
          {
            (this.props.data.children && this.props.data.children.length > 0) ? (
              this.props.data.children.map(item => {
                return <CategoryBox key={item.id} data={item}/>;
              })
            )

             : ''
          }
        </div>
      </div>
    );
  }
}

export default CategoryBox;
