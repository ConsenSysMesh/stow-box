const initialState = {
  results: [],
  message: '',
};

const searchReducer = (state = initialState, action) => {
  if (action.type === 'MAKE_SEARCH') {
    return Object.assign({}, state, {
      results: action.payload,
    });
  }
  if (action.type === 'REMOVE_SEARCH') {
    return Object.assign({}, state, {
      results: [],
    });
  }

  return state;
};

export default searchReducer;
