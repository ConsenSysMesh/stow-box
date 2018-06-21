import React, { Component } from 'react'
import Record from './Record'
import RecordForm from './RecordForm'
import PropTypes from 'prop-types'

class DecryptForm extends Component {
  render() {
    const {
      record,
      onInputChange,
      handleSubmit,
      handleDecrypt,
      privateKey,
      dataHash
    } = this.props;

    return (
      <div>
        <RecordForm
          onInputChange={onInputChange}
          handleSubmit={handleSubmit}
          dataHash={dataHash}
        />
        <Record record={record} />
        <form className="pure-form pure-form-stacked" onSubmit={handleDecrypt}>
          <fieldset>
            <label htmlFor="privateKey">Private Key</label>
            <input id="privateKey" type="text" value={privateKey} onChange={onInputChange} placeholder="Private Key" />
            <span className="pure-form-message">This is a required field.</span>

            <br />

            <button type="submit" className="pure-button pure-button-primary">Decrypt Data</button>
          </fieldset>
        </form>
      </div>
    );
  }
}

DecryptForm.propTypes = {
  record: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDecrypt: PropTypes.func.isRequired,
  privateKey: PropTypes.string,
  dataHash: PropTypes.string
}

export default DecryptForm



