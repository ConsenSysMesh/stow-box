import React, { Component } from 'react'
import LoginFormContainer from '../../ui/loginform/LoginFormContainer'

class Login extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Login</h1>
            <p>Fill the form to login</p>
            <LoginFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default Login
