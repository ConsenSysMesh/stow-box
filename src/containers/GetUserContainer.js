import { connect } from 'react-redux';
import GetUserForm from '../components/GetUser';
import { generateUser, registerUser } from '../actions/GetUser';

const mapStateToProps = (state) => {
  return { record: state.record };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUserSubmit: () => {
      dispatch(generateUser());
    },
    onGetRegisterUser: () => {
      dispatch(registerUser());
    },
  };
};

const GetUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GetUserForm);

export default GetUserContainer;
