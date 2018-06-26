import React, { Component } from 'react'

class GetRecordForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataHash: '',
      privateKey: ''
    }
  }

  onInputChange = (property) => (event) => {
    const value = event.target.value;
    this.setState({ [property] : value });
  }

  handleSubmit = () => (event) => {
    event.preventDefault()
    const dataHash = event.target.elements.dataHash.value

    if (dataHash.length < 2){
      return alert('Please fill the data hash.')
    }

    this.props.onGetRecordSubmit(dataHash)
  }

  handleDecrypt = () => (event) => {
    event.preventDefault()
    const privateKey = event.target.elements.privateKey.value

    if (privateKey.length < 2){
      return alert('Please fill the Private Key.')
    }

    this.props.onGetRecordDecrypt(this.props.record.data, privateKey)
  }

  render() {
    const comp1 = () =>         
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit()}>
        <fieldset>
          <label htmlFor="dataHash">Data Hash</label>
          <input id="dataHash" type="text" value={this.state.dataHash} onChange={this.onInputChange('dataHash')} placeholder="Data Hash" />
          <span className="pure-form-message">This is a required field.</span>

          <br />

          <button type="submit" className="pure-button pure-button-primary">Get Record</button>
        </fieldset>
      </form>

    const comp2 = () =>
      <div>
        <h2>Record: {this.props.record.data.dataHash}</h2>
        <p>Owner: {this.props.record.data.owner}</p>
        <p>metadataHash: {this.props.record.data.metadataHash}</p>
        <p>sigCount: {this.props.record.data.sigCount.toString()}</p>
        <p>irisScore: {this.props.record.data.irisScore.toString()}</p>
        <p>dataUri: {this.props.record.data.dataUri}</p>
        <p>ipfsHash: {this.props.record.data.ipfsHash}</p>
      </div>

    //Got Results
    if(this.props.record.data){
      
      //To decrypt
      if(!this.props.record.data.decrypted){
        return(
          <div>
            {comp1()}
            {comp2()}
            <form className="pure-form pure-form-stacked" onSubmit={this.handleDecrypt()}>
              <fieldset>
                <label htmlFor="privateKey">Private Key</label>
                <input id="privateKey" type="text" value={this.state.privateKey} onChange={this.onInputChange('privateKey')} placeholder="Private Key" />
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
            {comp1()}
            {comp2()}
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
      return(comp1())
    }
  }
}

export default GetRecordForm
