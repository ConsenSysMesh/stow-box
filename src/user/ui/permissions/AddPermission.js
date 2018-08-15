import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddPermission extends Component {
  constructor (props) {
    super(props);

    //TODO: rename recordDataHash
    this.state = {
      dataHash: '',
      viewerAddress: '',
      viewerPublicSharingKey: '',
      ownerPrivateKey: '',
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
      this.state.viewerAddress,
      this.state.viewerPublicSharingKey,
      this.state.ownerPrivateKey
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
                type={(property === 'ownerPrivateKey') ? 'password' : 'text'}
                onChange={this.onInputChange(property)}
              />
            </label>);
          })}
          <br />
          <button className='pure-button pure-button-primary' type='submit'>Add Permission</button>
        </form>
      </div>
    );
  }
}

AddPermission.propTypes = {
  addPermission: PropTypes.func.isRequired,
  clearPermissionsError: PropTypes.func.isRequired,
};

export default AddPermission;
