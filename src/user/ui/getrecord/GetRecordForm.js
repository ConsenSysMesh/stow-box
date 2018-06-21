import React, { Component } from 'react'

class GetRecordForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataHash: '',
      privateKey: ''
    }
  }

  onInputChange(event) {
    let value = event.target.value
    if (event.target.id == 'dataHash'){
      this.setState({ dataHash: value })
    } else if (event.target.id == 'privateKey'){
      this.setState({ privateKey: value })
    }
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.dataHash.length < 2){
      return alert('Please fill the data hash.')
    }

    this.props.onGetRecordSubmit(this.state.dataHash)
  }

  handleDecrypt(event) {
    event.preventDefault()

    if (this.state.privateKey.length < 2){
      return alert('Please fill the Private Key.')
    }

    this.props.onGetRecordDecrypt(this.props.record.data, this.state.privateKey)
  }

  render() {
    //Got Results
    if(this.props.record.data){

      //To decrypt
      if(!this.props.record.data.decrypted){
        return(
          <div>
            <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
              <fieldset>
                <label htmlFor="dataHash">Data Hash</label>
                <input id="dataHash" type="text" value={this.state.dataHash} onChange={this.onInputChange.bind(this)} placeholder="Data Hash" />
                <span className="pure-form-message">This is a required field.</span>
      
                <br />
      
                <button type="submit" className="pure-button pure-button-primary">Get Record</button>
              </fieldset>
            </form>
            <div>
              <h2>Record: {this.props.record.data.dataHash}</h2>
              <p>Owner: {this.props.record.data.owner}</p>
              <p>metadataHash: {this.props.record.data.metadataHash}</p>
              <p>sigCount: {this.props.record.data.sigCount.toString()}</p>
              <p>irisScore: {this.props.record.data.irisScore.toString()}</p>
              <p>dataUri: {this.props.record.data.dataUri}</p>
              <p>ipfsHash: {this.props.record.data.ipfsHash}</p>
            </div>
            <form className="pure-form pure-form-stacked" onSubmit={this.handleDecrypt.bind(this)}>
              <fieldset>
                <label htmlFor="privateKey">Private Key</label>
                <input id="privateKey" type="text" value={this.state.privateKey} onChange={this.onInputChange.bind(this)} placeholder="Private Key" />
                <span className="pure-form-message">This is a required field.</span>
      
                <br />
      
                <button type="submit" className="pure-button pure-button-primary">Decrypt Data</button>
              </fieldset>
            </form>
          </div>
        )
      }

      //Decrypted File
      else{
        return(
          <div>
            <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
              <fieldset>
                <label htmlFor="dataHash">Data Hash</label>
                <input id="dataHash" type="text" value={this.state.dataHash} onChange={this.onInputChange.bind(this)} placeholder="Data Hash" />
                <span className="pure-form-message">This is a required field.</span>
      
                <br />
      
                <button type="submit" className="pure-button pure-button-primary">Get Record</button>
              </fieldset>
            </form>
            <div>
              <h2>Record: {this.props.record.data.dataHash}</h2>
              <p>Owner: {this.props.record.data.owner}</p>
              <p>metadataHash: {this.props.record.data.metadataHash}</p>
              <p>sigCount: {this.props.record.data.sigCount.toString()}</p>
              <p>irisScore: {this.props.record.data.irisScore.toString()}</p>
              <p>dataUri: {this.props.record.data.dataUri}</p>
              <p>ipfsHash: {this.props.record.data.ipfsHash}</p>
            </div>
            <div>
              <h2>Decryted Data</h2>
              <p>{this.props.record.data.decrypted}</p>
            </div>
          </div>
        )
      }

    }

    //New Search
    else {
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
}

export default GetRecordForm
