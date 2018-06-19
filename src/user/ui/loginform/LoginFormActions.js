import { loginUser } from '../loginbutton/LoginButtonActions'
import firebase from '../../../firebase.js'
const bcrypt = require('bcryptjs')

export function tryLoginUser(username, password) {

  // Login with firebase
  return function(dispatch) {  
    const usersRef = firebase.database().ref('users')
    usersRef.orderByChild('username').equalTo(username).once('value',snapshot => {
      const userData = snapshot.val();
      for(var i in userData){
        var hash = userData[i].password
        var name = userData[i].name
      }

      // Check username and password
      if (userData && bcrypt.compareSync(password, hash)){
        const user = {
          name: name,
          username: username
        }
        return dispatch(loginUser(user))
      } 
      
      // Wrong username or password does not exists
      else {
        return alert('Wrong username or password')
      }
    });
  }
}