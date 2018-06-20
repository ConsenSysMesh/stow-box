import { loginUser } from '../loginbutton/LoginButtonActions'
import firebase from '../../../firebase.js'
const bcrypt = require('bcryptjs')

export function tryLoginUser(address, password) {

  // Login with firebase
  return function(dispatch) {  
    const usersRef = firebase.database().ref('users')
    usersRef.orderByChild('address').equalTo(address).once('value',snapshot => {
      const userData = snapshot.val();
      for(var i in userData){
        var hash = userData[i].password
        var name = userData[i].name
      }

      // Check address and password
      console.log(userData)
      if (userData && bcrypt.compareSync(password, hash)){
        const user = {
          name: name,
          address: address
        }
        return dispatch(loginUser(user))
      }
      
      // Wrong address or password does not exists
      else {
        return alert('Wrong address or password')
      }
    });
  }
}