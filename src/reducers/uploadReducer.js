import {
  UPLOAD_ERROR,
  UPLOADING_TO_IPFS,
  DATA_UPLOADED,
} from '../actions/UploadActions';

const initialState = {
  isLoading: false,
  message: null,
  done: false,
};

const uploadDataReducer = (state = initialState, action) => {
  if (action.type === UPLOADING_TO_IPFS) {
    const { isLoading, message } = action;
    return Object.assign({}, state, { isLoading, message });
  }
  else if (action.type === DATA_UPLOADED) {
    const { isLoading, hash } = action;
    return Object.assign({}, state, { isLoading, hash });
  }
  else if (action.type === UPLOAD_ERROR) {
    const { isLoading, message } = action;
    return Object.assign({}, state, { isLoading, message });
  }

  return state;
};

export default uploadDataReducer;
