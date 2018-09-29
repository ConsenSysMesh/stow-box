import { connect } from 'react-redux';
import GetRecordForm from '../components/GetRecord';
import { getRecord, getDecryptedRecord } from '../actions/GetRecordActions';

const mapStateToProps = (state, ownProps) => {
  return { record: state.record };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetRecordSubmit: (dataHash) => {
      dispatch(getRecord(dataHash));
    },
    onGetRecordDecrypt: (record, privateKey) => {
      dispatch(getDecryptedRecord(record, privateKey));
    },
  };
};

const GetRecordContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GetRecordForm);

export default GetRecordContainer;
