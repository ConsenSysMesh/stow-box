import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Record extends Component {
  render() {
    const { record } = this.props;

    return (
      <div>
        <h2>Record: {record.data.dataHash}</h2>
        <p>Owner: {record.data.owner}</p>
        <p>metadataHash: {record.data.metadataHash}</p>
        <p>sigCount: {record.data.sigCount.toString()}</p>
        <p>irisScore: {record.data.irisScore.toString()}</p>
        <p>dataUri: {record.data.dataUri}</p>
        <p>ipfsHash: {record.data.ipfsHash}</p>
      </div>
    )
  }
}

Record.propTypes = {
  record: PropTypes.object.isRequired
}

export default Record
