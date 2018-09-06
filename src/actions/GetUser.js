import store from '../store';
import Wallet from "ethereumjs-wallet";

export const GET_RECORD = 'GET_RECORD';
export const ADD_USER = 'ADD_USER';
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR';

const assignRecord = (record) => ({
  type: GET_RECORD,
  payload: record,
});

const addUser = () => ({
  type: ADD_USER,
  isLoading: true,
});

// const userRegistered = (userAddress, users) => ({
//   type: USER_REGISTERED,
//   isLoading: false,
//   userAddress,
//   users,
// });

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
  console.log('registering...');

  dispatch(addUser());
  const linnia = store.getState().auth.linnia;
  const [userAddress] = await store.getState().auth.web3.eth.getAccounts();
  const { users } = await linnia.getContractInstances();

  try {
    const alreadyRegistered = await users.isUser(userAddress);

    if (!alreadyRegistered) {
      await users.register({from: userAddress, gas: 500000, gasPrice: 20000000000});
    }

    dispatch(assignRecord(users));
    // dispatch(userRegistered(userAddress, users));
  } catch(e){
    dispatch(registrationError("Unable to register the user", userAddress, users));
  }
};
