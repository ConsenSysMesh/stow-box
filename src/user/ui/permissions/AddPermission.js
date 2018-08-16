import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddPermission extends Component {
  constructor (props) {
    super(props);

    //TODO: rename recordDataHash
    this.state = {
      dataHash: '',
      viewerEthereumAddress: '',
      viewerEncyptionPublicKey: '',
      ownerEncryptionPrivateKey: '',
    };

    // Set variables pass as url arguments
    window.location.search.substr(1).split('&').forEach((param) => {
      const key = param.split('=')[0];
      const val = param.split('=')[1];
      if (this.state[key] !== undefined) {
        this.state[key] = val;
      }
    });
  }

  onInputChange = (property) => (event) => {
    this.props.clearPermissionsError();
    const value = event.target.value;
    this.setState({ [property]: value });
  }

  camelToPretty = (string) => {
    return string.replace(/([A-Z])/g, (match) => ` ${match}`)
      .replace(/^./, (match) => match.toUpperCase());
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.addPermission(
      this.state.dataHash,
      this.state.viewerEthereumAddress,
      this.state.viewerEncyptionPublicKey,
      this.state.ownerEncryptionPrivateKey
    );
  }

  render () {
    return (
      <div className='permissions-form inline-block'>
        <h2>Add Permission</h2>
        <form className='pure-form pure-form-stacked' onSubmit={this.handleSubmit}>
          {Object.keys(this.state).map((property, i) => {
            return (<label key={i}>{this.camelToPretty(property)}
              <input
                name={property}
                required
                value={this.state[property]}
                type={(property === 'ownerEncryptionPrivateKey') ? 'password' : 'text'}
                onChange={this.onInputChange(property)}
              />
            </label>);
          })}
          <br />
          <button className='pure-button pure-button-primary' type='submit'>Add Permission</button>
        </form>
        <p>In order to share a file using the Linnia Protocol you have to give permission to access the file to the viewer</p>
        <p><span>Data Hash</span> of the file you are sharing</p>
        <p><span>Viewer Ethereum Address</span>: The Ethereum Address of the user that you are sharing with</p>
        <p><span>Viewer Encyption Public Key</span>: The Encryption Public Key of the user that you are sharing with</p>
        <p><span>Owner Encryption Private Key</span>: Your personal Encryption Private Key</p>
      </div>
    );
  }
}

AddPermission.propTypes = {
  addPermission: PropTypes.func.isRequired,
  clearPermissionsError: PropTypes.func.isRequired,
};

export default AddPermission;
