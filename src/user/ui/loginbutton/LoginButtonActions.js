import { browserHistory } from 'react-router'
import firebase from '../../../firebase.js'

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export function loginUser(user) {
  const usersRef = firebase.database().ref('users')

  return function(dispatch) {
    usersRef.orderByChild("username").equalTo(user.username).once("value",snapshot => {
      const userData = snapshot.val();
      if (userData){
        dispatch(userLoggedIn(user))
        var currentLocation = browserHistory.getCurrentLocation()

        if ('redirect' in currentLocation.query)
        {
          return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
        }

        return browserHistory.push('/dashboard')
      } 

      else{
        return browserHistory.push('/signup')
      }
    });
  }
}
