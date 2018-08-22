import store from '../store';
import axios from 'axios';
import { encrypt, decrypt } from '../utils';
import { Buffer } from 'safe-buffer';
import config from '../config';

export const SET_PERMISSIONS = 'SET_PERMISSIONS';
export const REMOVE_PERMISSION = 'REMOVE_PERMISSION';
export const ADD_PERMISSION = 'ADD_PERMISSION';
export const PERMISSION_ERROR = 'PERMISSION_ERROR';
export const UPLOADING_PERMISSION = 'UPLOADING_PERMISSION';

/*
  These are values that MetaMask will default to when asking the user
  for consent to make a transaction on their behalf. The user can
  adjust these using MetaMask. They are set artificially high for developmemt
  purposes.
*/

const gasPrice = 20000000000;
const gas = 500000;

const canAccess = true;

const assignPermissions = (permissions) => ({
  type: SET_PERMISSIONS,
  payload: permissions,
});

const removePermission = (permission) => ({
  type: REMOVE_PERMISSION,
  payload: permission,
  isLoading: false,
});

const appendPermission = (permission) => ({
  type: ADD_PERMISSION,
  payload: permission,
  isLoading: false,
});

const showPermissionError = (message) => ({
  type: PERMISSION_ERROR,
  isLoading: false,
  message,
});

const uploadingPermission = () => ({
  type: UPLOADING_PERMISSION,
  isLoading: true,
});

export const clearPermissionsError = () => async (dispatch) => {

  /*
    We unset the permissions error. Used to remove errors from the UI.
  */

  dispatch(showPermissionError(''));
};

export const getPermissions = () => async (dispatch) => {

  /*
    First, we get the user's address from the contract state.
    Next, we query the linnia server to find all of the permissions
    for that user. The URI is built here. Finally, we add the array of permissions
    we receive to the state by dispatching an action.
  */

  const [ownerAddress] = await store.getState().auth.web3.eth.getAccounts();
  const host = config.LINNIA_SEARCH_URI;
  const url = `${host}/users/${ownerAddress}/permissions`;
  const response = await axios.get(url);
  dispatch(assignPermissions(response.data));
};

export const revokePermission = (permission) => async (dispatch) => {

  /*
    First, we dispatch an event the ultimately renders a "loading" component
    so the user knows the application is working asynchronously. Next, we
    pull the linnia library object from the state and use it to get the permissions
    contract object. Finally, we use the permissions contract object to revoke the permission.
    The user will be prompted to approve the transaction by MetaMask or whatever identity
    provider they are using. If it's successful, an action kickes off that removes the permission
    from the UI. If there's an error, an action kicks off that displays it.
  */

  dispatch(uploadingPermission());

  const linnia = store.getState().auth.linnia;
  const [ownerAddress] = await store.getState().auth.web3.eth.getAccounts();
  const dataHash = permission.dataHash;
  const viewer = permission.viewer;
  const { permissions } = await linnia.getContractInstances();

  try {
    // This will prompt the user to sign the transaction, then make it
    await permissions.revokeAccess(dataHash, viewer, {
      from: ownerAddress,
      gasPrice,
      gas,
    });
  } catch (e) {
    console.error(e);
    dispatch(showPermissionError('Transaction to ethereum network failed! Please check your console for errors.'));
    return;
  }

  dispatch(removePermission(permission));
};

export const addPermission = (dataHash, viewerEthereumAddress, viewerEncyptionPublicKey, ownerEncryptionPrivateKey) => async (dispatch) => {
  let file, decryptedData, reencrypted, IPFSDataUri;

  dispatch(uploadingPermission());

  /*
    This one is a bit of a doozy. First, we pull the ipfs api wrapper and the linnia
    library object from the state. Next, we pull the owner encrypted data down from
    IPFS. Next, we try to decrypt the data using the provided ownerPrivateKey. If the key
    isn't valid, we kick off an action that exposes the error. If it works, we then attempt
    to encrypt the file using the viewer's public key. If that doesn't work, we kick off an
    action that exposes an error in the UI. If it does work, we then try to upload the newly
    viewer encryped data up to IPFS. Once the data is in IPFS, we call the permissions contract
    and attempt to add the new Permission to the Linnia contract. The user will be prompted to
    sign the transaction. If she consents, the permission will be added to the blockchain,
    then added to the UI via an action getting kicked off.
  */

  const linnia = store.getState().auth.linnia;
  const ipfs = linnia.ipfs;

  // Get the record from the blockchain
  const record = await linnia.getRecord(dataHash);

  if (!record.dataHash) {
    dispatch(showPermissionError('Unable to retreive record. Does a record with that dataHash exist?'));
    return;
  }

  // Pull the owner encrypted record down from ipfs
  try {
    file = await new Promise((resolve, reject) => {
      ipfs.cat(record.dataUri, (err, ipfsRed) => {
        err ? reject(err) : resolve(ipfsRed);
      });
    });

  } catch (e) {
    dispatch(showPermissionError('Unable to pull file from storage. Does record have valid dataUri?'));
    return;
  }

  // Decrypt the file using the owner's private key
  try {
    const encryptedData = file;
    decryptedData = await decrypt(ownerEncryptionPrivateKey, encryptedData);
  } catch (e) {
    dispatch(showPermissionError('Unable to decrypt file. Is the owner private key correct?'));
    return;
  }

  // Re-encrypt the file using the viewer's public key
  try {
    reencrypted = await encrypt(new Buffer(viewerEncyptionPublicKey, 'hex'), decryptedData);
  } catch (e) {
    dispatch(showPermissionError('Unable to encrypt file for viewer. Is the viewer public key correct?'));
    return;
  }

  // Upload the viewer encrypted file up to a new location in IPFS
  try {
    IPFSDataUri = await new Promise((resolve, reject) => {
      ipfs.add(reencrypted, (err, ipfsRed) => {
        err ? reject(err) : resolve(ipfsRed);
      });
    });
  } catch (e) {
    dispatch(showPermissionError('Unable to reupload viewer file. Please try again later.'));
    return;
  }

  if(!IPFSDataUri) {
    dispatch(showPermissionError('IPFS URI is not valid, please check ipfs setup'));
  }

  const [owner] = await store.getState().auth.web3.eth.getAccounts();

  // Create a new permissions record on the blockchain
  try {
    const { permissions } = await linnia.getContractInstances();
    await permissions.grantAccess(dataHash, viewerEthereumAddress, IPFSDataUri, {
      from: owner,
      gasPrice,
      gas,
    });
  } catch (e) {
    console.error(e);
    dispatch(showPermissionError('Transaction to ethereum network failed! Please check your console for errors.'));
    return;
  }

  const permission = {
    viewerEthereumAddress,
    owner,
    IPFSDataUri,
    dataHash,
    canAccess,
  };

  dispatch(appendPermission(permission));
};
