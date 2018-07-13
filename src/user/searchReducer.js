const initialState = {
  results: null,
};

const searchReducer = (state = initialState, action) => {
  if (action.type === 'MAKE_SEARCH') {
    return Object.assign({}, state, {
      results: action.payload,
    });
  }
  if (action.type === 'REMOVE_SEARCH') {
    return Object.assign({}, state, {
      results: null,
    });
  }

  return state;
};

export default searchReducer;
