import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'
import web3Reducer from './util/web3/web3Reducer'
import ipfsReducer from './util/ipfs/ipfsReducer'
import linniaReducer from './util/linnia/linniaReducer'
import recordReducer from './user/recordReducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  web3: web3Reducer,
  record: recordReducer,
  ipfs: ipfsReducer,
  linnia: linniaReducer
})

export default reducer
