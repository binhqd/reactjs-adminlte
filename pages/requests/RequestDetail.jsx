
import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {RequestDetail} from 'components/requests';

class RequestDetailContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <MainLayout>
        <div>
          <RequestDetail id={this.props.match.params.id}/>
        </div>
      </MainLayout>
    );
  }
}

export default RequestDetailContainer;
