import { loginUser } from '../loginbutton/LoginButtonActions'

export function signUpUser(name, address) {

  // Register the User
  return function(dispatch) {
    const user = {
      name: name,
      address: address
    }
    return dispatch(loginUser(user))
  }
}