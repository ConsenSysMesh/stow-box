import { AUTH_SUCCESS, AUTH_FAILURE } from './AuthActions';

const initialState = {
  web3: null,
  linnia: null,
  ipfs: null,
  isAuthenticated: false,
  authError: '',
};

const linniaReducer = (state = initialState, action) => {
  if (action.type === AUTH_SUCCESS) {
    const { web3, ipfs, linnia } = action;
    const isAuthenticated = true;

    return Object.assign({}, state, {
      web3,
      ipfs,
      linnia,
      isAuthenticated,
    });
  } else if (action.type === AUTH_FAILURE) {
    const { authError, isAuthenticated } = action;
    return Object.assign({}, state, { authError, isAuthenticated });
  }

  return state;
};

export default linniaReducer;
