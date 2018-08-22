import App from '../components/App';
import { authenticate } from '../actions/AuthActions';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  const { isAuthenticated, authError } = state.auth;

  return {
    isAuthenticated,
    authError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticate: () => {
      dispatch(authenticate());
    },
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
