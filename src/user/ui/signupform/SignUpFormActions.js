import { loginUser } from '../loginbutton/LoginButtonActions'
import firebase from '../../../firebase.js'
const bcrypt = require('bcryptjs')

export function signUpUser(name, address, password) {

  // Register the User in firebase
  return function(dispatch) {
    const usersRef = firebase.database().ref('users')
    usersRef.orderByChild("address").equalTo(address).once("value",snapshot => {
      const userData = snapshot.val();
      if (userData){
        return alert('This address already exists')
      } 
      
      // New Address
      else {
        var salt = bcrypt.genSaltSync(10)
        var hash = bcrypt.hashSync(password, salt)
        const user = {
          name: name,
          address: address,
          password: hash
        }
        usersRef.push(user)
        return dispatch(loginUser(user))
      }
    })
  }
}