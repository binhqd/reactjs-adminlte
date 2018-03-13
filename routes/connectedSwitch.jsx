import {connect} from 'react-redux';
import {Switch} from 'react-router-dom';

const mapStateToProps = state => {
  return {location: state.routing.location};
};

const ConnectedSwitch = connect(mapStateToProps)(Switch);

export default ConnectedSwitch;
