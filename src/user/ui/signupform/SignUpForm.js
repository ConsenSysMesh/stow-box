import React, { Component } from 'react'
import store from '../../../store'

class SignUpForm extends Component {
  constructor(props) {
    super(props)

    let web3 = store.getState().web3.web3Instance
    let address = ''

    if (typeof web3 !== 'undefined') {
      address = web3.eth.accounts[0]
    }

    this.state = {
      name: '',
      address: address
    }
  }

  onInputChange = (property) => (event) => {
    const value = event.target.value;
    this.setState({ [property] : value });
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const name = event.target.elements.name.value
    const address = event.target.elements.address.value
    
    if (name.length < 2){
      return alert('Please fill in your name.')
    }

    if (address.length !== 42){
      return alert('Please enter a valid ethereum address.')
    }

    if (address.substring(0,2) !== '0x'){
      return alert('The address should start with 0x')
    }

    this.props.onSignUpFormSubmit(name, address)
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit}>
        <fieldset>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" value={this.state.name} onChange={this.onInputChange('name')} placeholder="Name" />
          <span className="pure-form-message">This is a required field.</span>

          <br />
          <label htmlFor="address">Address</label>
          <input id="address" type="text" value={this.state.address} onChange={this.onInputChange('address')} placeholder="Address" />
          <span className="pure-form-message">This is a required field.</span>

          <br />

          <button type="submit" className="pure-button pure-button-primary">Sign Up</button>
        </fieldset>
      </form>
    )
  }
}

export default SignUpForm
