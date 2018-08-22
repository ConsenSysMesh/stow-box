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

  return state;
};

export default recordReducer;
