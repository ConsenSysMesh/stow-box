import Web3 from 'web3';
import IPFS from 'ipfs-mini';
import Linnia from '@linniaprotocol/linnia-july-2018';
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

export const authenticate = () => async dispatch => {
  let web3;

  try {
    web3 = await getWeb3();
  } catch (e) {
    console.error(e);
    return dispatch(authFailure(NO_METAMASK));
  }

  const accounts = await web3.eth.getAccounts();
  const address = accounts[0];

  if (!address) {
    console.error('Metamask is locked!');
    return dispatch(authFailure(LOCKED_METAMASK));
  }

  const ipfs = new IPFS({ host, port, protocol });

  try {
    console.log(ipfs)
    await ipfs.id();
  } catch (e) {
    console.error('IPFS is not configured correctly!');
    return dispatch(authFailure(IPFS_MISCONFIGURED));
  }

  // checking to see if contract exists at address since truffle-contract doesnt expose error
  const code = await web3.eth.getCode(hubAddress);
  if (!code || code === '0x0' || code === '0x') {
    console.error('Linnia is not configured correctly!');
    return dispatch(authFailure(LINNIA_MISCONFIGURED));
  }

  const linnia = new Linnia(web3, ipfs, { hubAddress });

  dispatch(authSuccess(web3, ipfs, linnia));
};
