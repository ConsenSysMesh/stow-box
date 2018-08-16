import React, { Component } from 'react'

class SearchForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      dataHash: '',
      owner: '',
      property: '',
    }

    // Set variables pass as url arguments
    window.location.search.substr(1).split('&').forEach((param) => {
      const key = param.split('=')[0]
      const val = param.split('=')[1]
      if (this.state[key] !== undefined) {
        this.state[key] = val
      }
    })
  }

  onInputChange = (property) => (event) => {
    const value = event.target.value
    this.setState({ [property]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const dataHash = event.target.elements.dataHash.value
    const owner = event.target.elements.owner.value
    const property = event.target.elements.property.value
    this.props.onSearchSubmit(dataHash, owner, property)
  }

  render () {
    const searchForm = () =>
      <form className='pure-form pure-form-stacked' onSubmit={this.handleSubmit}>
        <fieldset>
          <label htmlFor='dataHash'>Record Data Hash</label>
          <input id='dataHash' type='text' value={this.state.dataHash} onChange={this.onInputChange('dataHash')} placeholder='Record Data Hash' />

          <br />

          <label htmlFor='owner'>Owner Ethereum Address</label>
          <input id='owner' type='text' value={this.state.owner} onChange={this.onInputChange('owner')} placeholder='Owner Ethereum Address' />

          <br />

          <label htmlFor='property'>Property</label>
          <input id='property' type='text' value={this.state.property} onChange={this.onInputChange('property')} placeholder='Property' />

          <br />

          <button type='submit' className='pure-button pure-button-primary'>Search</button>
        </fieldset>
      </form>

    const searchResults = (records) =>
      records.map(record => {
        return (
          <div key={record.dataHash}>
            <h2>Record: {record.dataHash}</h2>
            <p>Owner: {record.owner}</p>
            <p>Metadata: {record.metadata}</p>
            <p>SigCount: {record.sigCount.toString()}</p>
            <p>IrisScore: {record.irisScore.toString()}</p>
            <p>DataUri: {record.dataUri}</p>
          </div>)
      })

    if (this.props.search.results) {
      var res = JSON.parse(this.props.search.results)
      if (res.constructor !== Array) {
        res = [res]
      }
      if (res.message) {
        return (
          <div>
            <p className='error-message'>{res.message}</p>
            {searchForm()}
          </div>
        )
      } else {
        return (
          <div>
            {searchForm()}
            {searchResults(res)}
          </div>
        )
      }
    } else {
      return (
        <div>
          {searchForm()}
        </div>
      )
    }
  }
}

export default SearchForm
