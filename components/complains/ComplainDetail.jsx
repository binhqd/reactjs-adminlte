import React, { Component } from 'react';
import {UserInfo} from 'components/partials/userinfo';
import {Complains} from 'api';
// import {ConversationContainer} from 'components/conversations';

class ComplainDetail extends Component {
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
    Complains.actions.get.request({
      id: this.props.id,
      filter: {
        include: ['user']
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

        <h1 className='user-header'>Thông tin người gửi</h1>
        <section className="list-request">

          <UserInfo user={this.state.request.user}/>
          <div className='list-request-wrap'>
          </div>
        </section>
        <br/>

        <br/>
        <h1 className='user-header'>Nội dung</h1>
        <div>
          <p>{this.state.request.content}</p>
        </div>
        {/* <ConversationContainer id={this.state.id}/> */}
      </div>


    );
  }

}

export default ComplainDetail;
