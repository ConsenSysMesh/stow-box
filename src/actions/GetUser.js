import store from '../store';
import Wallet from "ethereumjs-wallet";

export const GET_RECORD = 'GET_RECORD';
export const USER_REGISTERED = 'USER_REGISTERED';
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR';

const assignRecord = (record) => ({
  type: GET_RECORD,
  payload: record,
});

const userRegistered = (user) => ({
  type: USER_REGISTERED,
  payload: user,
});

const registrationError = (message, userAddress, users) => ({
  type: REGISTRATION_ERROR,
  isLoading: false,
  message,
  userAddress,
  users,
});

export const generateUser = () => async (dispatch) => {
  const wallet = Wallet.generate();
  let privateKey = wallet.getPrivateKeyString();
  let publicKey = wallet.getPublicKeyString();
  let record = { privateKey: privateKey, publicKey: publicKey };

  dispatch(assignRecord(record));
};

export const registerUser = () => async (dispatch) => {
  const linnia = store.getState().auth.linnia;
  const [userAddress] = await store.getState().auth.web3.eth.getAccounts();
  const { users } = await linnia.getContractInstances();

  try {
    const alreadyRegistered = await users.isUser(userAddress);

    if (!alreadyRegistered) {
      await users.register({from: userAddress, gas: 500000, gasPrice: 20000000000});
    }

    dispatch(userRegistered(users));
  } catch(e){
    dispatch(registrationError("Unable to register the user", userAddress, users));
  }
};
