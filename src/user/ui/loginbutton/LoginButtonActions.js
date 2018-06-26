import { browserHistory } from 'react-router'

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export function loginUser(user) {

  return function(dispatch) {
    dispatch(userLoggedIn(user))
    var currentLocation = browserHistory.getCurrentLocation()

    if ('redirect' in currentLocation.query)
    {
      return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
    }

    return browserHistory.push('/dashboard')
  }
}
