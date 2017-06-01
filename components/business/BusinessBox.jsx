import React from 'react';
import {Link} from 'react-router';
import {store} from 'base/routes';
import {Categories} from 'api';

class BusinessBox extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  handleDelete(catID, e) {
    if (confirm("Are you sure to delete this business?")) {
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
    const img = require('assets/images/placeholder-128.jpg');
    return (
      <div className="media">
        <h3>{this.props.data.name}</h3> [ <Link to={`/businesses/edit/${this.props.data.id}`}>Sửa</Link> | <a onClick={this.handleDelete.bind(this, this.props.data.id)}>Xóa</a> ]
        {
          /*<div className="media-left media-middle">
          <a href="#">
            <img className="media-object" src={img} alt="..." width="64" height="64"/>
          </a>
        </div>*/
        }
        <div className="media-body">
          <p>{this.props.data.description}</p>
          {
            (this.props.data.children && this.props.data.children.length > 0) ? (
              this.props.data.children.map(item => {
                return <BusinessBox key={item.id} data={item}/>;
              })
            )

             : ''
          }
        </div>
      </div>
    );
  }
}

export default BusinessBox;
