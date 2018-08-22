import React, { Component } from 'react';
import ModelViewer from 'metamask-logo';
import PropTypes from 'prop-types';

import {
  LOCKED_METAMASK,
  NO_METAMASK,
  LINNIA_MISCONFIGURED,
  IPFS_MISCONFIGURED,
} from '../actions/AuthActions';

const errorCopy = {
  [NO_METAMASK]: 'No Metamask found. Please install Metamask and try again.',
  [LOCKED_METAMASK]: 'Please unlock Metamask and refresh to continue.',
  [LINNIA_MISCONFIGURED]: 'No hub found at supplied address on supplied network. Please check your configuration and network and try again.',
  [IPFS_MISCONFIGURED]: 'Connect to IPFS failed. Are you sure you configured it correctly?',
};

class AuthError extends Component {
  componentDidMount () {
    const viewer = ModelViewer({
      pxNotRatio: true,
      width: 200,
      height: 200,
      followMouse: true,
    });

    const container = document.getElementById('metamask-logo-container');
    container.appendChild(viewer.container);
  }

  render () {
    const { authError } = this.props;

    return (
      <div className='auth-error'>
        <div id='metamask-logo-container' />
        <h2>{errorCopy[authError]}</h2>
      </div>
    );
  }
}

AuthError.propTypes = {
  authError: PropTypes.string.isRequired,
};

export default AuthError;
