const initialState = {
  data: null,
};

const userReducer = (state = initialState, action) => {
  if (action.type === 'USER_REGISTERED') {
    return Object.assign({}, state, {
      data: action.payload,
    });
  }

  return state;
};

export default userReducer;
