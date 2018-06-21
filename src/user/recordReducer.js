const initialState = {
  data: null
}

const recordReducer = (state = initialState, action) => {
  if (action.type === 'GET_RECORD')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  return state
}

export default recordReducer
