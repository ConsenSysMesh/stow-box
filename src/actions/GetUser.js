import store from '../store';
import { decrypt } from '../utils';
import Wallet from "ethereumjs-wallet";

export const GET_RECORD = 'GET_RECORD';

const assignRecord = (record) => ({
  type: GET_RECORD,
  payload: record,
});

export const generateUser = () => async (dispatch) => {
  const wallet = Wallet.generate();
  let privateKey = wallet.getPrivateKeyString();
  let publicKey = wallet.getPublicKeyString();
  let record = { privateKey: privateKey, publicKey: publicKey };

  dispatch(assignRecord(record));
};

export const getDecryptedRecord = (record, privateKey) => async (dispatch) => {

  /*
    We start by pulling the IPFS api wrapper from the state. Then,
    we use the wrapper to pull the encrypted data at the dataUri down from IPFS.
    Finally, we attempt to decrypt the data using the provided private key. If
    it's successful, we add the decrypted data to the state. If not, we display an
    error.
  */

  const { ipfs } = store.getState().auth;

  if (record.owner === '0x0000000000000000000000000000000000000000') {
    return (alert('Error: owner address is zero. does the file exist?'));
  }

  // Use ipfs library to pull the encrypted data down from IPFS
  ipfs.cat(record.dataUri, async (err, ipfsRes) => {
    if (err) {
      console.log(err);
    } else {
      const encrypted = ipfsRes;

      // Try to decrypt with the provided key
      try {
        const decrypted = await decrypt(privateKey, encrypted);
        record.decrypted = JSON.stringify(decrypted.toString());
        dispatch(assignRecord(record));
      } catch (e) {
        console.log(e);
        return (alert('Error decrypting data. Probably wrong private key'));
      }
    }
  });
};
