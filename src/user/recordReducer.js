const initialState = {
  data: null
}

const recordReducer = (state = initialState, action) => {
  if (action.type === 'GET_RECORD')
  {
    console.log('record added')
    console.log(action.payload)
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  return state
}

export default recordReducer
