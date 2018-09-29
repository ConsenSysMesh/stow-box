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
  let uploadLocalFile = async function (dispatch, ipfs, linnia) {
    const fileReader = new FileReader();
    fileReader.onloadend = async (e) => {
      let content = fileReader.result;

      if(typeof content !== 'object'){
        content = JSON.parse(content);
      }

      let encrypted, dataUri;
      //Encrypt
      try {
        dispatch(uploadingToIpfs());
        encrypted = await encrypt(
          public_key,
          content,
        );
      } catch (e) {
        console.error('Unable to encrypt file. Check the Public Key');
        dispatch(uploadError("Unable to encrypt file. Check the Public Key"));
        return;
      }

      //Upload to IPFS
      try {
        dataUri = await new Promise((resolve, reject) => {
          ipfs.add(encrypted, (err, ipfsRed) => {
            err ? reject(err) : resolve(ipfsRed);
          });
        });
      } catch (e) {
        console.error('Unable to upload file to IPFS');
        dispatch(uploadError("Unable to upload file to IPFS"));
        return;
      }

      const [owner] = await store.getState().auth.web3.eth.getAccounts();
      const {records} = await linnia.getContractInstances();

      content.nonce = crypto.randomBytes(256).toString('hex');
      // hash of the plain file
      const hash = linnia.web3.utils.sha3(JSON.stringify(content));

      //Upload file to Linnia
      try {
        await records.addRecord(
          hash,
          metadata,
          dataUri,
          {
            from: owner,
            gas: 500000,
            gasPrice: 20000000000
          },
        );
      } catch (e) {
        console.error('Unable to upload file to Linnia');
        dispatch(uploadError("Unable to upload file to Linnia"));
        return;
      }

      dispatch(dataUploaded());

    };

    fileReader.readAsText(file);
  };

  // Upload data to Linnia
  return async (dispatch) => {
    const linnia = store.getState().auth.linnia;
    const ipfs = linnia.ipfs;

    //TODO: clean this up so that there is less duplicate code
    if(file instanceof Blob) {
      // Read File
      await uploadLocalFile(dispatch, ipfs, linnia);
    } else {
      const content = file;

      let encrypted, dataUri;
      //Encrypt
      try {
        dispatch(uploadingToIpfs());
        encrypted = await encrypt(
          public_key,
          JSON.stringify(content),
        );
      } catch (e) {
        console.error('Unable to encrypt file. Check the Public Key');
        dispatch(uploadError("Unable to encrypt file. Check the Public Key"));
        return;
      }

      //Upload to IPFS
      try {
        dataUri = await new Promise((resolve, reject) => {
          ipfs.add(encrypted, (err, ipfsRed) => {
            err ? reject(err) : resolve(ipfsRed);
          });
        });
      } catch (e) {
        console.error('Unable to upload file to IPFS');
        dispatch(uploadError("Unable to upload file to IPFS"));
        return;
      }

      const [owner] = await store.getState().auth.web3.eth.getAccounts();
      const {records} = await linnia.getContractInstances();

      // hash of the plain file plus nonce
      content.nonce = crypto.randomBytes(256).toString('hex');

      const hash = linnia.web3.utils.sha3(JSON.stringify(content));

      //Upload file to Linnia
      try {
        await records.addRecord(
          hash,
          metadata,
          dataUri,
          {
            from: owner,
            gas: 500000,
            gasPrice: 20000000000
          },
        );
      } catch (e) {
        console.error('Unable to upload file to Linnia');
        dispatch(uploadError("Unable to upload file to Linnia"));
        return;
      }

      dispatch(dataUploaded());

    }
  };
};
