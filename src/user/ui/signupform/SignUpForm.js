import React, { Component } from 'react'

class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      address: '',
      password: '',
      password_confirmation: ''
    }
  }

  onInputChange(event) {
    let value = event.target.value
    if (event.target.id == 'name'){
      this.setState({ name: value })
    } else if (event.target.id == 'address'){
      this.setState({ address: value })
    } else if (event.target.id == 'password'){
      this.setState({ password: value })
    } else if (event.target.id == 'password_confirmation'){
      this.setState({ password_confirmation: value })
    }
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.name.length < 2){
      return alert('Please fill in your name.')
    }

    if (this.state.address.length != 42){
      return alert('Please enter a valid ethereum address.')
    }

    if (this.state.address.substring(0,2) != '0x'){
      return alert('The address should start with 0x')
    }

    if (this.state.password.length < 6){
      return alert('Password require at least 6 characters')
    }

    if (this.state.password != this.state.password_confirmation){
      return alert('Password and Password Confirmation does not match')
    }


    this.props.onSignUpFormSubmit(this.state.name, this.state.address, this.state.password)
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" value={this.state.name} onChange={this.onInputChange.bind(this)} placeholder="Name" />
          <span className="pure-form-message">This is a required field.</span>

          <br />
          <label htmlFor="address">Address</label>
          <input id="address" type="text" value={this.state.address} onChange={this.onInputChange.bind(this)} placeholder="Address" />
          <span className="pure-form-message">This is a required field.</span>

          <br />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={this.state.password} onChange={this.onInputChange.bind(this)} placeholder="Password" />
          <span className="pure-form-message">This is a required field.</span>

          <br />
          <label htmlFor="password_confirmation">Password Confirmation</label>
          <input id="password_confirmation" type="password" value={this.state.password_confirmation} onChange={this.onInputChange.bind(this)} placeholder="Password Confirmation" />
          <span className="pure-form-message">This is a required field.</span>

          <br />

          <button type="submit" className="pure-button pure-button-primary">Sign Up</button>
        </fieldset>
      </form>
    )
  }
}

export default SignUpForm
