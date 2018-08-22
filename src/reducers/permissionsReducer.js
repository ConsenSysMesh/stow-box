import {
  SET_PERMISSIONS,
  REMOVE_PERMISSION,
  ADD_PERMISSION,
  UPLOADING_PERMISSION,
  PERMISSION_ERROR,
} from '../actions/PermissionsActions';

const initialState = {
  asOwner: [],
  asViewer: [],
  isLoading: false,
  message: '',
};

const permissionsReducer = (state = initialState, action) => {
  if (action.type === SET_PERMISSIONS) {
    return Object.assign({}, state, action.payload);
  } else if (action.type === REMOVE_PERMISSION) {
    const index = state.asOwner.indexOf(action.payload);
    const asOwner = state.asOwner.slice();
    const { isLoading } = action;
    asOwner.splice(index, 1);
    return Object.assign({}, state, { asOwner, isLoading });
  } else if (action.type === ADD_PERMISSION) {
    const { isLoading } = action;
    const asOwner = state.asOwner.slice();
    asOwner.push(action.payload);
    return Object.assign({}, state, { asOwner, isLoading });
  } else if (action.type === UPLOADING_PERMISSION) {
    const isLoading = true;
    return Object.assign({}, state, { isLoading });
  } else if (action.type === PERMISSION_ERROR) {
    const { message, isLoading } = action;
    return Object.assign({}, state, { message, isLoading });
  }

  return state;
};

export default permissionsReducer;
