import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {store} from 'base/routes';
import {ArticleCategories} from 'api';
import {connect} from 'react-redux';
import CONFIG from 'base/constants/config';
import {UploadImage} from 'components/UI/Image';
import style from './_ArticleCategoryBox.scss';

class ArticleCategoryBox extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  handleDelete(id, e) {
    if (confirm("Bạn có muốn xóa tin khuyến mãi này?")) {
      ArticleCategories.actions.delete.request({ id }).then(response => {
        this.props.deleteCallBack();
      });
    }
  }

  render() {

    return (
      <div className="media">
        <h3>
          {this.props.data.name}

          <Link to={`/article-categories/edit/${this.props.data.id}`} className="btn-actions"><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></Link> &nbsp;
          <a onClick={this.handleDelete.bind(this, this.props.data.id)} className="btn-actions"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
        </h3>

        <div className="media-body">
          

        </div>
      </div>
    );
  }
}

export default withRouter(connect()(ArticleCategoryBox));
