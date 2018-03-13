import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {store} from 'base/routes';
import {FAQs} from 'api';
import {connect} from 'react-redux';
import CONFIG from 'base/constants/config';
import {UploadImage} from 'components/UI/Image';
import style from './_FAQBox.scss';

class FAQBox extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  handleDelete(id, e) {
    if (confirm("Bạn có muốn xóa tin tức này?")) {
      FAQs.actions.delete.request({ id }).then(response => {
        this.props.deleteCallBack();
      });
    }
  }

  render() {
    return (
      <tbody>

        <tr>
          <td>{this.props.index}</td>
          <td>
            <div className="media">
              <h3>
                {this.props.data.question}

              </h3>

              <div className="media-body">
                <div className='' dangerouslySetInnerHTML={{__html:this.props.data.answer}}></div>
              </div>
            </div>
          </td>
          <td>{this.props.actionPanel}</td>
        </tr>

      </tbody>
    );
  }
}

export default withRouter(connect()(FAQBox));
