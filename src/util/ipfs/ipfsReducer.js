const initialState = {
  ipfsInstance: null
}

const ipfsReducer = (state = initialState, action) => {
  if (action.type === 'IPFS_INITIALIZED')
  {
    return Object.assign({}, state, {
      ipfsInstance: action.payload.ipfsInstance
    })
  }

  return state
}

export default ipfsReducer
