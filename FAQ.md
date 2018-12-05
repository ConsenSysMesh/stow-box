# Frequently Asked Questions

### What is the Stow Box?

Stow Box is a starter kit to build a Dapp. Stow Box comes with a React-Redux frontend and it's integrated with the Stow protocol. After installing Stow Box you will have a working Dapp with Stow as the backend and data storage and React-Redux for the frontend

### What is the purpose of the Stow Box?

The purpose of the Stow Box is to help developers build Dapps and start using Stow Protocol very easy with just a couple of simple steps

### Where can I learn more about Redux?

[Redux Documentation](https://es.redux.js.org/)

### What can I learn more about React?

[React Documentation](https://reactjs.org/)

###  Where can I learn more about IPFS?

[IPFS Website](https://ipfs.io/), [IPFS Whitepaper](https://github.com/ipfs/papers/raw/master/ipfs-cap2pfs/ipfs-p2p-file-system.pdf)

### Can I use another storage solution like Amazon’s AWS or Google Cloud?

Stow Box is set up to use IPFS but Stow protocol is design to support any kind of storage system you want. We haven't implemented that in Stow Box yet. Feel free to modify Stow Box in order to use another storage system if you want. You can also check [Stow-JS](https://github.com/ConsenSys/stow-js) a JavaScript library to interact with Stow Protocol. You can use that library to use Stow Protocol with any storage system

### Where are the Stow functions inside the React App?

All the interaction between Stow Box and Stow Protocol is done using the Stow-JS library. If you go to the [actions](https://github.com/ConsenSys/stow-box/tree/master/src/actions) folder you will find the different files that use Stow-JS

### Where can I learn more about MetaMask?

[MetaMask Website](https://metamask.io/)

### What is the DataHash?

The DataHash is the hash of the plain text data of the record plus the plain text metadata

### What is the use of the DataHash?

It is used as a prove that the decrypted data is the exact same that was intented to be uploaded in the first place

### How do I generate the DataHash?

The DataHash is generated when a record is uploaded to Stow. You can check the code on how it is generated when using the Stow Faucet [here](https://github.com/ConsenSys/stow-faucet/blob/327899c04903cde23888859236ae6a42de625eed/src/actions/UploadDataActions.jsx#L66)

### What is the purpose of the Stow Faucet?

The purpose of the Stow Faucet is to onboard new developers that wants to use Stow Protocol. With the Faucet you can very easily create a pair of keys, generate a Ethereum Waller, get some test ETH, register a user in Stow and upload records. You can find the faucet [here](https://faucet.ropsten.stow-protocol.com/)

### What do I do with the Public and Private keys generated?

Your private key is used to decrypt records, when you want to download something that you uploaded previously or when someone shared a record with you. You should never share your private key to anybody and you should store it in a secure way.

The public key is used when someone wants to share a record with you or when you encrypt a record to store it. You can read more about the keys [here](https://github.com/ConsenSys/stow-resources/blob/master/KEYS.md)

### Are the keys generated added to Stow smart contracts or the Stow Server?

Your private key is never stored so you should be very carefully abput where to store it in order to not loose it and also to be sure that nobody can steal it. Your public key is stored in the metadata of the records that you upload

### How does the Stow Server interact with the Stow Box?

The Stow Server is a service that can be used in order to query records using the Metadata. The plain text Metadata is only stored in the logs of the Ethereum Blockchain. Because of that is not that easy to query. We created the Stow Server in order to allow developers to access and query the Metadata easily. The Stow Box uses the Stow Server in order to do this

### More about Stow

If you want to learn more about Stow Protocol or any of our resourcer we invite you to check [this](https://github.com/ConsenSys/stow-resources)