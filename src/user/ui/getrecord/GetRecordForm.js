import React, { Component } from 'react'
import DecryptForm from './DecryptForm'
import Decrypted from './Decrypted'
import RecordForm from './RecordForm'

class GetRecordForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataHash: '',
      privateKey: ''
    }
  }

  onInputChange = (event) => {
    let value = event.target.value
    if (event.target.id === 'dataHash'){
      this.setState({ dataHash: value })
    } else if (event.target.id === 'privateKey'){
      this.setState({ privateKey: value })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    if (this.state.dataHash.length < 2){
      return alert('Please fill the data hash.')
    }

    this.props.onGetRecordSubmit(this.state.dataHash)
  }

  handleDecrypt = (event) => {
    event.preventDefault()

    if (this.state.privateKey.length < 2){
      return alert('Please fill the Private Key.')
    }

    this.props.onGetRecordDecrypt(this.props.record.data, this.state.privateKey)
  }

  render() {
    const { record } = this.props;
    const { privateKey, dataHash } = this.state;
    //Got Results
    if (record.data) {

      //To decrypt
      if (!record.data.decrypted) {
        return (<DecryptForm
          record={record}
          privateKey={privateKey}
          onInputChange={this.onInputChange}
          handleDecrypt={this.handleDecrypt}
          handleSubmit={this.handleSubmit}
          dataHash={dataHash}
        />)
      }

      //Decrypted File
      else {
        return (<Decrypted
          onInputChange={this.onInputChange}
          handleSubmit={this.handleSubmit}
          record={record}
        />)
      }

    }

    //New Search
    else {
      return (
        <RecordForm
          onInputChange={this.onInputChange}
          handleSubmit={this.handleSubmit}
          dataHash={dataHash}
        />
      );
    }
  }
}

export default GetRecordForm
