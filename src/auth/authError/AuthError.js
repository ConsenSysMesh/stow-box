import React, { Component } from 'react';
import ModelViewer from 'metamask-logo';
import PropTypes from 'prop-types';

import { 
  LOCKED_METAMASK, 
  NO_METAMASK, 
  WRONG_HUB_ADDRESS 
} from './../AuthActions';

const errorCopy = {
  [NO_METAMASK]: 'No Metamask found. Please install Metamask and try again.',
  [LOCKED_METAMASK]: 'Please unlock Metamask and refresh to continue.',
  [WRONG_HUB_ADDRESS]: 'No hub found at supplied address on supplied network. Please check your configuration and try again.'
}

class AuthError extends Component {
  componentDidMount() {
    const viewer = ModelViewer({
      pxNotRatio: true,
      width: 200,
      height: 200,
      followMouse: true,
    });

    const container = document.getElementById('metamask-logo-container');
    container.appendChild(viewer.container);
  }

  render() {
    const { authError } = this.props;

    return (
      <div>
        <div id="metamask-logo-container"></div>
        <h2>{errorCopy[authError]}</h2>
      </div>
    );
  }
}

AuthError.propTypes = {
  AuthError: PropTypes.string.isRequired
};

export default AuthError;
