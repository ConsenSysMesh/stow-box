import { connect } from 'react-redux'
import GetRecordForm from './GetRecordForm'
import { getRecord } from './GetRecordFormActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetRecordSubmit: (dataHash) => {
      dispatch(getRecord(dataHash))
    }
  }
}

const GetRecordFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GetRecordForm)

export default GetRecordFormContainer
