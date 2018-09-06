import { connect } from 'react-redux';
import GetUserForm from '../components/GetUser';
import { generateUser, getDecryptedRecord } from '../actions/GetUser';

const mapStateToProps = (state, ownProps) => {
  return { record: state.record };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUserSubmit: () => {
      dispatch(generateUser());
    },
    onGetRecordDecrypt: (record, privateKey) => {
      dispatch(getDecryptedRecord(record, privateKey));
    },
  };
};

const GetUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GetUserForm);

export default GetUserContainer;
