import React from 'react';
// import Businesses from 'dummy/categories';
import {BusinessBox} from 'components/business';
import {connect} from 'react-redux';
import {Businesses} from 'base/api';

class BusinessList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      businesses: []
    }

    Businesses.actions.list.request().then(res => {
      this.setState({
        businesses: res.data
      })
    });
  }

  render() {
    return (
      <div>
        {
          this.state.businesses.map(business => {
            return <BusinessBox key={business.id} data={business}/>;
          })
        }
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {

  };
}

export default connect(mapStateToProps)(BusinessList);
