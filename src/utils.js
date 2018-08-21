import EthCrypto from 'eth-crypto';

export const encrypt = async (pubKeyTo, plaintext) => {

  /*
    This function uses a popular crypto library to encrypt plaintext data.
    It first marshalls the public key to a format that the library supports.
    Then it encrypts the data using the library. Finally, it marshalls the
    encrypted data into a string and returns it.
  */

  const hexPubKeyString = pubKeyTo.toString('hex');
  const hexPubKey = hexPubKeyString.substr(0, 2) === '0x' ? 
    hexPubKeyString.toString('hex').substr(2) : 
    hexPubKeyString.toString('hex');

  const payload = {
    message: plaintext,
  };

  const encrypted = await EthCrypto.encryptWithPublicKey(hexPubKey, JSON.stringify(payload));
  return EthCrypto.cipher.stringify(encrypted);
};

export const decrypt = async (privKey, encrypted) => {

  /*
    This function does the opposite of the above function. It takes a private
    key, marshalls it into a form that the library supports, then uses it to decrypt
    the provided data. It parses the decrypted data and returns it as a POJO. 
  */

  const hexPrivKeyString = privKey.toString('hex');
  const hexPrivKey = hexPrivKeyString.substr(0, 2) === '0x' ? hexPrivKeyString : `0x${hexPrivKeyString}`;

  const encryptedObject = EthCrypto.cipher.parse(encrypted);
  const decrypted = await EthCrypto.decryptWithPrivateKey(
    hexPrivKey,
    encryptedObject,
  );
  const decryptedPayload = JSON.parse(decrypted);
  return decryptedPayload.message;
};