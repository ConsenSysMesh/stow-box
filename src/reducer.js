import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import web3Reducer from './util/web3/web3Reducer'
import ipfsReducer from './util/ipfs/ipfsReducer'
import linniaReducer from './util/linnia/linniaReducer'
import recordReducer from './user/recordReducer'
import searchReducer from './user/searchReducer'

const reducer = combineReducers({
  routing: routerReducer,
  web3: web3Reducer,
  record: recordReducer,
  search: searchReducer,
  ipfs: ipfsReducer,
  linnia: linniaReducer
})

export default reducer
