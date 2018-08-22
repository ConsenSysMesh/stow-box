import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthError from '../components/AuthError';

const Copy = () => {
  return (
    <div>
      <h1>Good to Go!</h1>
      <p>Your Truffle Box is installed and ready.</p>
      <h2>Linnia as a decentralized backend</h2>
      <p>TODO, text about linnia and link to the public documentation</p>
      <h2>Metamask Authentication</h2>
      <p>This particular box comes with autentication via Metamask.</p>
      <h3>Further Reading</h3>
      <p>
        The React/Redux portions of the authentication fuctionality are provided by
        {' '}
        <a
          href='https://github.com/mjrussell/redux-auth-wrapper'
          target='_blank'
          rel='noopener noreferrer'
        >
          mjrussell/redux-auth-wrapper
        </a>
        .
      </p>
    </div>
  );
};

class Home extends Component {
  render () {
    const { authError } = this.props;

    return (
      <main className='container'>
        <div className='pure-g'>
          <div className='pure-u-1-1'>
            {authError ? <AuthError authError={authError} /> : <Copy />}
          </div>
        </div>
      </main>
    );
  }
}

Home.propTypes = {
  authError: PropTypes.string,
};

export default Home;
