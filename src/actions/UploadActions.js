import store from '../store';
import { encrypt } from '../utils';
import crypto from 'crypto';

export const UPLOAD_ERROR = 'UPLOAD_ERROR';
export const UPLOADING_TO_IPFS = 'UPLOADING_TO_IPFS';
export const DATA_UPLOADED = 'DATA_UPLOADED';

const uploadError = (message) => ({
  type: UPLOAD_ERROR,
  isLoading: false,
  message,
});

const uploadingToIpfs = () => ({
  type: UPLOADING_TO_IPFS,
  isLoading: true,
});

const dataUploaded = () => ({
  type: DATA_UPLOADED,
  isLoading: false,
  done: true,
});

export const uploadData = (file, public_key, metadata) => {
  return async (dispatch) => {
    const linnia = store.getState().auth.linnia;
    const ipfs = linnia.ipfs;
    const content = file;
    let encrypted, dataUri;

    // Encrypt
    try {
      dispatch(uploadingToIpfs());
      encrypted = await encrypt(
        public_key,
        JSON.stringify(content),
      );
    }
    catch (e) {
      dispatch(uploadError('Unable to encrypt file. Check the Public Key'));
      return;
    }

    // Upload to IPFS
    try {
      dataUri = await new Promise((resolve, reject) => {
        ipfs.add(encrypted, (err, ipfsRed) => {
          err ? reject(err) : resolve(ipfsRed);
        });
      });
    }
    catch (e) {
      dispatch(uploadError('Unable to upload file to IPFS'));
      return;
    }

    const [owner] = await store.getState().auth.web3.eth.getAccounts();
    const {records} = await linnia.getContractInstances();

    // Hash of the plain file plus nonce
    content.nonce = crypto.randomBytes(256).toString('hex');

    const hash = linnia.web3.utils.sha3(JSON.stringify(content));

    // Upload to Linnia
    try {
      await records.addRecord(
        hash,
        metadata,
        dataUri,
        {
          from: owner,
          gas: 500000,
          gasPrice: 20000000000,
        },
      );
    }
    catch (e) {
      dispatch(uploadError('Unable to upload file to Linnia'));
      return;
    }

    dispatch(dataUploaded());
  };
};
