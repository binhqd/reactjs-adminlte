import React from 'react';
import {Link} from 'react-router';
import {store} from 'base/routes';
import {Promotions} from 'api';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import CONFIG from 'base/constants/config';

class PromotionBox extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  handleDelete(promotionID, e) {
    if (confirm("Bạn có muốn xóa tin khuyến mãi này?")) {
      Promotions.actions.delete.request({ id: promotionID }).then(response => {
        // store.dispatch({
        //   type: 'REMOVE_CATEGORY',
        //   id: catID
        // });
        this.props.dispatch({
          type: 'REMOVE_BUSINESS',
          promotionId: promotionID
        });
      });
    }
  }

  render() {
    let img = require('assets/images/placeholder-128.jpg');

    if (this.props.data.banner) {
      img = `${CONFIG.staticURL}/promotion-banners/${this.props.data.banner.name}`;
    }

    return (
      <div className="media">
        <h3>
          {this.props.data.title}

          <Link to={`/promotions/edit/${this.props.data.id}`} className="btn-actions"><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></Link> &nbsp;
          <a onClick={this.handleDelete.bind(this, this.props.data.id)} className="btn-actions"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
        </h3>
        {
          <div className="media-left media-middle">
            <a href="#">
              <img className="media-object" src={img} alt="..." height="64"/>
            </a>
          </div>
        }
        <div className="media-body">
          <p>{this.props.data.description}</p>
          {
            (this.props.data.children && this.props.data.children.length > 0) ? (
              this.props.data.children.map(item => {
                return <PromotionBox key={item.id} data={item}/>;
              })
            )
             : ''
          }
        </div>
      </div>
    );
  }
}

export default connect()(PromotionBox);
