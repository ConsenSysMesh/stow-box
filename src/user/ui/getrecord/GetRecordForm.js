import React, { Component } from 'react'

class GetRecordForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataHash: '' 
    }
  }

  onInputChange(event) {
    this.setState({ dataHash: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.dataHash.length < 2){
      return alert('Please fill the data hash.')
    }

    this.props.onGetRecordSubmit(this.state.dataHash)
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="dataHash">Data Hash</label>
          <input id="dataHash" type="text" value={this.state.dataHash} onChange={this.onInputChange.bind(this)} placeholder="Data Hash" />
          <span className="pure-form-message">This is a required field.</span>

          <br />

          <button type="submit" className="pure-button pure-button-primary">Get Record</button>
        </fieldset>
      </form>
    )
  }
}

export default GetRecordForm
