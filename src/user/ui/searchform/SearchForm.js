import React, { Component } from 'react'

class SearchForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataHash: '',
      owner: '',
      property: ''
    }
  }

  onInputChange = (property) => (event) => {
    const value = event.target.value;
    this.setState({ [property] : value });
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const dataHash = event.target.elements.dataHash.value
    const owner = event.target.elements.owner.value
    const property = event.target.elements.property.value
    this.props.onSearchSubmit(dataHash, owner, property)
  }

  render() {
    const searchForm = () =>         
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit}>
        <fieldset>
          <label htmlFor="dataHash">Data Hash</label>
          <input id="dataHash" type="text" value={this.state.dataHash} onChange={this.onInputChange('dataHash')} placeholder="Data Hash" />

          <br />

          <label htmlFor="owner">Owner</label>
          <input id="owner" type="text" value={this.state.owner} onChange={this.onInputChange('owner')} placeholder="Owner" />

          <br />

          <label htmlFor="property">Property</label>
          <input id="property" type="text" value={this.state.property} onChange={this.onInputChange('property')} placeholder="Property" />

          <br />

          <button type="submit" className="pure-button pure-button-primary">Search</button>
        </fieldset>
      </form>

  const searchResults = (records) => 
    records.map(record => {
      return(
        <div>
          <h2>Record: {record.dataHash}</h2>
          <p>Owner: {record.owner}</p>
          <p>metadata: {record.metadata}</p>
          <p>sigCount: {record.sigCount.toString()}</p>
          <p>irisScore: {record.irisScore.toString()}</p>
          <p>dataUri: {record.dataUri}</p>
        </div>)
    });

    if(this.props.search.results){
      var res = JSON.parse(this.props.search.results)
      if(! res instanceof Array){
        res = [res]
      }
      if(res.message){
        return(
          <div>
            <p className="error-message">{res.message}</p>
            {searchForm()}
          </div>
        ) 
      }else{
        return(
          <div>
            {searchForm()}
            {searchResults(res)}
          </div>
        )
      }
    }
    else{
      return(
        <div>
          {searchForm()}
        </div>
      ) 
    }
  }
}

export default SearchForm
