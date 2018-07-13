import { connect } from 'react-redux'
import GetRecordForm from './GetRecordForm'
import { getRecord, getDecryptedRecord } from './GetRecordFormActions'

const mapStateToProps = (state, ownProps) => {
  return { record: state.record }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetRecordSubmit: (dataHash) => {
      dispatch(getRecord(dataHash))
    },
    onGetRecordDecrypt: (record, privateKey) => {
      dispatch(getDecryptedRecord(record, privateKey))
    },
  }
}

const GetRecordFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GetRecordForm)

export default GetRecordFormContainer
