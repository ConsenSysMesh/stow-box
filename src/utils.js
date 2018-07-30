import EthCrypto from 'eth-crypto';

export async function encrypt (pubKeyTo, plaintext) {
    const hexPubKeyString = pubKeyTo.toString('hex');
    const hexPubKey = hexPubKeyString.substr(0, 2) === '0x' ? hexPubKeyString.toString('hex').substr(2) : hexPubKeyString.toString('hex');

    const payload = {
        message: plaintext,
    };
    const encrypted = await EthCrypto.encryptWithPublicKey(hexPubKey, JSON.stringify(payload));
    return EthCrypto.cipher.stringify(encrypted);
};

export async function decrypt (privKey, encrypted) {
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