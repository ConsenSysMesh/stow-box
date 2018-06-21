const initialState = {
  linniaInstance: null
}

const linniaReducer = (state = initialState, action) => {
  if (action.type === 'LINNIA_INITIALIZED')
  {
    return Object.assign({}, state, {
      linniaInstance: action.payload.linniaInstance
    })
  }

  return state
}

export default linniaReducer
