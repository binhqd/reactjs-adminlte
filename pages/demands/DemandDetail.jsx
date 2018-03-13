
import React, {PropTypes} from 'react';
import {MainLayout} from 'components/layouts';
import {DemandDetail} from 'components/demands';

class DemandDetailContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <MainLayout>
        <div>
          <DemandDetail id={this.props.match.params.id}/>
        </div>
      </MainLayout>
    );
  }
}

export default DemandDetailContainer;
