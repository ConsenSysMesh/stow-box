const initialState = {
  data: null,
  registration: null,
};

const userReducer = (state = initialState, action) => {
  if (action.type === 'USER_GENERATED') {
    return Object.assign({}, state, {
      data: action.payload,
    });
  }
  if (action.type === 'USER_REGISTERED') {
    return Object.assign({}, state, {
      registration: action.payload,
    });
  }

  return state;
};

export default userReducer;
