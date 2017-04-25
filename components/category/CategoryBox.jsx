import React from 'react';

class CategoryBox extends React.Component {
  constructor(props, context) {
    super(props, context);


  }

  render() {
    return (
      <div className="media">
        <h3>{this.props.data.name}</h3>
        <div className="media-left media-middle">
          <a href="#">
            <img className="media-object" src="..." alt="..."/>
          </a>
        </div>
        <div className="media-body">
          <h4 className="media-heading">Middle aligned media</h4>
          <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
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
