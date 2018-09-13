import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './authReducer';
import recordReducer from './recordReducer';
import userReducer from './userReducer';
import searchReducer from './searchReducer';
import permissionsReducer from './permissionsReducer';

const reducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  record: recordReducer,
  user: userReducer,
  permissions: permissionsReducer,
  search: searchReducer,
});

export default reducer;
