import { loginUser } from '../loginbutton/LoginButtonActions'

export function tryLoginUser(address) {

  // Login
  return function(dispatch) {  
    const user = {
      name: name,
      address: address
    }
    return dispatch(loginUser(user))
  }
}