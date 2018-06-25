import { browserHistory } from 'react-router'

export const USER_LOGGED_OUT = 'USER_LOGGED_OUT'
function userLoggedOut(user) {
  return {
    type: USER_LOGGED_OUT,
    payload: user
  }
}

export const REMOVE_SEARCH = 'REMOVE_SEARCH'
function removeSearch() {
  return {
    type: REMOVE_SEARCH,
    payload: null
  }
}

export const REMOVE_RECORD = 'REMOVE_RECORD'
function removeRecord() {
  return {
    type: REMOVE_RECORD,
    payload: null
  }
}

export function logoutUser() {
  return function(dispatch) {
    // Logout user.
    dispatch(userLoggedOut())
    dispatch(removeSearch())
    dispatch(removeRecord())

    // Redirect home.
    return browserHistory.push('/')
  }
}
