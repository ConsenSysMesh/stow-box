import React, { Component } from 'react'

class LoginForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
  }

  onInputChange(event) {
    let value = event.target.value
    if (event.target.id == 'username'){
      this.setState({ username: value })
    } else if (event.target.id == 'password'){
      this.setState({ password: value })
    }
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.username.length < 2){
      return alert('Please fill in your username.')
    }

    if (this.state.password.length < 6){
      return alert('Password require at least 6 characters')
    }


    this.props.onLoginFormSubmit(this.state.username, this.state.password)
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" value={this.state.username} onChange={this.onInputChange.bind(this)} placeholder="Username" />
          <span className="pure-form-message">This is a required field.</span>

          <br />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={this.state.password} onChange={this.onInputChange.bind(this)} placeholder="Password" />
          <span className="pure-form-message">This is a required field.</span>

          <br />

          <button type="submit" className="pure-button pure-button-primary">Login</button>
        </fieldset>
      </form>
    )
  }
}

export default LoginForm
