import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {Link, withRouter} from 'react-router-dom';
import {toastr} from 'react-redux-toastr';
import {SubscriptionMailContentEditor} from 'components/subscriptions';

class SubcriptionMailContent extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {

    }
  }

  verify(id) {

  }


  render() {
    return (
      <MainLayout>
        <div>
          <h3>Soạn nội dung email</h3>
          <SubscriptionMailContentEditor/>
        </div>
      </MainLayout>
    );
  }
}

export default SubcriptionMailContent;
