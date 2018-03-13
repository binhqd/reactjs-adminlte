import React, { Component } from 'react';
import {ProductBrief} from 'components/partials/product';
import {UserInfo} from 'components/partials/userinfo';
import {Requests} from 'api';
// import {ConversationContainer} from 'components/conversations';

class RequestDetail extends Component {
  constructor(propx, context) {
    super(propx, context);

    this.state = {
      id: this.props.id
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id != this.state.id) {
      this.setState({
        id: nextProps.id
      })
    }
  }

  componentDidMount() {
    Requests.actions.get.request({
      id: this.props.id,
      filter: {
        include: ['user', 'product', 'business']
      }
    }).then(response => {
      this.setState({
        request: response.data
      })
    })
  }

  render() {
    if (!this.state.request) return null;

    return (
      <div>

        <h1 className='user-header'>Thông tin người yêu cầu</h1>
        <section className="list-request">

          <UserInfo user={this.state.request.user}/>
          <div className='list-request-wrap'>
          </div>
        </section>
        <br/>
        <h1 className='user-header'>Thông tin sản phẩm</h1>
        <section className="list-request">

          <ProductBrief product={this.state.request.product}/>
          <div className='list-request-wrap'>
          </div>
        </section>
        <br/>
        <h1 className='user-header'>Thông tin trao đổi</h1>
        <div>
          <p>{this.state.request.description}</p>
        </div>
        {/* <ConversationContainer id={this.state.id}/> */}
      </div>


    );
  }

}

export default RequestDetail;
