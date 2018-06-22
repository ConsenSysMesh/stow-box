import React, { Component } from 'react'
import PropTypes from 'prop-types'

class RecordForm extends Component {
  render() {
    const { handleSubmit, onInputChange, dataHash } = this.props;

    return (
      <form className="pure-form pure-form-stacked" onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="dataHash">Data Hash</label>
          <input id="dataHash" type="text" value={dataHash} onChange={onInputChange} placeholder="Data Hash" />
          <span className="pure-form-message">This is a required field.</span>

          <br />

          <button type="submit" className="pure-button pure-button-primary">Get Record</button>
        </fieldset>
      </form>
    )
  }
}

RecordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  dataHash: PropTypes.string
}

export default RecordForm
