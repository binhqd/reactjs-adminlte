import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {store} from 'base/routes';
import {Articles} from 'api';
import {connect} from 'react-redux';
import CONFIG from 'base/constants/config';
import {UploadImage} from 'components/UI/Image';
import style from './_ArticleBox.scss';

class ArticleBox extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  handleDelete(id, e) {
    if (confirm("Bạn có muốn xóa tin tức này?")) {
      Articles.actions.delete.request({ id }).then(response => {
        this.props.deleteCallBack();
      });
    }
  }

  render() {
    let Img = null;
    if (this.props.data.image) {
      Img = <UploadImage width={64} height={64} type='ARTICLE' image={this.props.data.image} transform='crop'/>
    } else {
      Img = <img className="media-object" src={require('assets/images/placeholder-128.jpg')} alt="..." width="64" height="64"/>;
    }

    return (
      <div className="media">
        <h3>
          {this.props.data.title}

          <Link to={`/articles/edit/${this.props.data.id}`} className="btn-actions"><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></Link> &nbsp;
          <a onClick={this.handleDelete.bind(this, this.props.data.id)} className="btn-actions"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
        </h3>

        {
          <div className="media-left media-middle">
            <a href="#">
              {Img}
            </a>
          </div>
        }
        <div className="media-body">
          <p>{this.props.data.description}</p>
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(ArticleBox));
