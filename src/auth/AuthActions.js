import Web3 from 'web3';
import IPFS from 'ipfs-api';
import Linnia from 'linnia';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const NO_METAMASK = 'NO_METAMASK';
export const LOCKED_METAMASK = 'LOCKED_METAMASK';
export const LINNIA_MISCONFIGURED = 'LINNIA_MISCONFIGURED';
export const IPFS_MISCONFIGURED = 'IPFS_MISCONFIGURED';

const hubAddress = process.env.LINNIA_HUB_ADDRESS;
const protocol = process.env.LINNIA_IPFS_PROTOCOL;
const port = process.env.LINNIA_IPFS_PORT;
const host = process.env.LINNIA_IPFS_HOST;

const authSuccess = (web3, ipfs, linnia) => ({
  type: AUTH_SUCCESS,
  web3,
  ipfs,
  linnia
});

const authFailure = (authError) => ({
  type: AUTH_FAILURE,
  isAuthenticated: false,
  authError
});

const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', async (dispatch) => {
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


export const authenticate = () => async (dispatch) => {
  let web3, address, ipfs, linnia;

  try {
    web3 = await getWeb3();
  } catch (e) {
    console.error(e);
    return dispatch(authFailure(NO_METAMASK));
  }

  address = web3.eth.accounts[0];

  if (!address) {
    console.error('Metamask is locked!');
    return dispatch(authFailure(LOCKED_METAMASK));
  }

  try {
    ipfs = new IPFS({ host , port, protocol });
  } catch (e) {
    console.error(e);
    return dispatch(authFailure(IPFS_MISCONFIGURED));
  }

  try {
    linnia = new Linnia(web3, ipfs, { hubAddress });
  } catch(e) {
    console.error(e);
    return dispatch(authFailure(LINNIA_MISCONFIGURED));
  }

  dispatch(authSuccess(web3, ipfs, linnia));
}


