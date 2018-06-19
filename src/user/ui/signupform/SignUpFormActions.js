import { loginUser } from '../loginbutton/LoginButtonActions'
import firebase from '../../../firebase.js'
const bcrypt = require('bcryptjs')

export function signUpUser(name, username, password) {

  // Register the User in firebase
  return function(dispatch) {
    const usersRef = firebase.database().ref('users')
    usersRef.orderByChild("username").equalTo(username).once("value",snapshot => {
      const userData = snapshot.val();
      if (userData){
        return alert('This username already exists')
      } 
      
      // New Username
      else {
        var salt = bcrypt.genSaltSync(10)
        var hash = bcrypt.hashSync(password, salt)
        const user = {
          name: name,
          username: username,
          password: hash
        }
        usersRef.push(user)
        return dispatch(loginUser(user))
      }
    })
  }
}