import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Record from './Record'
import RecordForm from './RecordForm'

class Decrypted extends Component {
  render() {
    const { onInputChange, handleSubmit, record } = this.props;

    return (
      <div>
        <RecordForm
          onInputChange={onInputChange}
          handleSubmit={handleSubmit}
        />
        <Record record={record} />
        <div>
          <h2>Decrypted Data</h2>
          <p>{record.data.decrypted}</p>
        </div>
      </div>
    );
  }
}

Decrypted.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  record: PropTypes.object
}

export default Decrypted
