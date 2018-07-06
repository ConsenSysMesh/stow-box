import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth/authReducer';
import recordReducer from './user/recordReducer';
import searchReducer from './user/searchReducer';
import permissionsReducer from './user/permissionsReducer';

const reducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  record: recordReducer,
  permissions: permissionsReducer,
  search: searchReducer
});

export default reducer;
