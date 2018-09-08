const initialState = {
  data: null,
};

const recordReducer = (state = initialState, action) => {
  if (action.type === 'GET_RECORD') {
    return Object.assign({}, state, {
      data: action.payload,
    });
  }
  if (action.type === 'REMOVE_RECORD') {
    return Object.assign({}, state, {
      data: null,
    });
  }
  if (action.type === 'USER_REGISTERED') {
    return Object.assign({}, state, {
      registration: action.payload,
    });
  }

  return state;
};

export default recordReducer;
