import Web3 from 'web3';
import IPFS from 'ipfs-mini';
import Linnia from '@linniaprotocol/linnia-js';
import config from '../config';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const NO_METAMASK = 'NO_METAMASK';
export const LOCKED_METAMASK = 'LOCKED_METAMASK';
export const LINNIA_MISCONFIGURED = 'LINNIA_MISCONFIGURED';
export const IPFS_MISCONFIGURED = 'IPFS_MISCONFIGURED';

const hubAddress = config.LINNIA_HUB_ADDRESS;
const protocol = config.LINNIA_IPFS_PROTOCOL;
const port = config.LINNIA_IPFS_PORT;
const host = config.LINNIA_IPFS_HOST;

const authSuccess = (web3, ipfs, linnia) => ({
  type: AUTH_SUCCESS,
  web3,
  ipfs,
  linnia,
});

const authFailure = authError => ({
  type: AUTH_FAILURE,
  isAuthenticated: false,
  authError,
});


const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', async dispatch => {
      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof window.web3 !== 'undefined') {
        // Use Mist/MetaMask's provider.
        resolve(new Web3(window.web3.currentProvider));
      } else {
        reject(NO_METAMASK);
      }
    });
  });
};

/*
  This action is where the app initializes it's connection to IPFS and the ethereum blockchain.
  If this action is successful, the user is considered 'loggedIn' and is able to use the app. If it fails,
  The user needs to take action on her part to log herself in. The AuthError component renders the text
  of the action that the user needs to take.
*/

export const authenticate = () => async dispatch => {
  let web3;

  /*
    First, we check to see that web3 has been injected into the browser window. This will most likely
    be done by the MetaMask browser extension, but could be another extension or browser.
  */
  try {
    web3 = await getWeb3();
  } catch (e) {
    console.error(e);
    return dispatch(authFailure(NO_METAMASK));
  }

  /*
    Next, we make sure that the user has logged into MetaMask. We get the first account address,
    then check that it exists. It will be undefined if the user's MetaMask is locked.
  */

  const accounts = await web3.eth.getAccounts();
  const address = accounts[0];

  if (!address) {
    console.error('Metamask is locked!');
    return dispatch(authFailure(LOCKED_METAMASK));
  }

  /*
    Next, we make sure the IPFS has been properly configured and can be connected to. This is 
    a developer check rather than a user authentication check.
  */

  const ipfs = new IPFS({ host: host, port: port, protocol: protocol });

  try {
    //TODO Ping IPFS to check connection
  } catch (e) {
    console.error('IPFS is not configured correctly!');
    return dispatch(authFailure(IPFS_MISCONFIGURED));
  }

  /*
    Finally, we make sure that we are able to connect to the Linnia Smart contracts. We use 
    Web3 to ping the contract address. If we receive and empty hex, we have provided the wrong
    hub address. This is another developer check.
  */

  const code = await web3.eth.getCode(hubAddress);
  if (!code || code === '0x0' || code === '0x') {
    console.error('Linnia is not configured correctly!');
    return dispatch(authFailure(LINNIA_MISCONFIGURED));
  }

  const linnia = new Linnia(web3, ipfs, { hubAddress });

  /*
    Success! Our user is ready to start interacting with the Linnia Protocol. We add the
    services to our state so that other actions and components can use them.
  */

  dispatch(authSuccess(web3, ipfs, linnia));
};
