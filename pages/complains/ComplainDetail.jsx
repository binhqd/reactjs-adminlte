
import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {ComplainDetail} from 'components/complains';

class ComplainDetailContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <MainLayout>
        <div>
          <ComplainDetail id={this.props.match.params.id}/>
        </div>
      </MainLayout>
    );
  }
}

export default ComplainDetailContainer;
