import { connect } from 'react-redux';
import UploadForm from '../components/Upload';
import { uploadData } from '../actions/UploadActions';

const mapStateToProps = (state, ownProps) => {
  return { upload: state.upload };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadData: (file, public_key, metadata) => {
      dispatch(uploadData(file, public_key, metadata));
    },
  };
};

const UploadContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadForm);

export default UploadContainer;
