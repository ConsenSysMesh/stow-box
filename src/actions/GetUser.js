import store from '../store';
import Wallet from "ethereumjs-wallet";

export const USER_GENERATED = 'USER_GENERATED';
export const USER_REGISTERED = 'USER_REGISTERED';
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR';

const userGenerated = (user) => ({
  type: USER_GENERATED,
  payload: user,
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
  let user = { privateKey: privateKey, publicKey: publicKey };

  dispatch(userGenerated(user));
};

export const registerUser = () => async (dispatch) => {
  const stow = store.getState().auth.stow;
  const [userAddress] = await store.getState().auth.web3.eth.getAccounts();
  const { users } = await stow.getContractInstances();

  try {
    const alreadyRegistered = await users.isUser(userAddress);

    if (!alreadyRegistered) {
      await users.register({from: userAddress, gas: 500000, gasPrice: 20000000000});
    }

    dispatch(userRegistered(users));
  }
  catch (e) {
    dispatch(registrationError('Unable to register the user', userAddress, users));
  }
};
