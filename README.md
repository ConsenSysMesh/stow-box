# Linnia, truffle box starter kit

This is a starter kit to start developing your app using the decentralized protocol Linnia as the backend and data manager. Linnia is going to be used to store any data you want and relate it to your users.

This starter kit is powered by Truffle Box and uses Metamask to authenticate users and sign transactions.



## Getting Started

First you have to install truffle

```
npm install -g truffle
```



### Unbox (This will work only when the repo will be public, for now skip this)

Create a directory for your project and download the truffle box.

```
mkdir my_linnia_app
cd my_linnia_app
truffle unbox ConsenSys/linnia-box
```



### Download the Kit

```
git clone git@github.com:ConsenSys/linnia-box.git
cd linnia-box
```

Install the dependencies:

```
npm install
```



## Metamask

In order to be able to fully use your starter kit you need to download Metamask to manage your Web3 instance and you connection to the Ethereum Blockchain Network.

If you don't have Metamask yet, go to the following link, download and install it https://metamask.io/



## Run

You have everything setup, now you have to run some services in order to have you first Linnia app working.

There are 3 services that the starter kit need. For all of them you have the default running version or you local one.



## Services Needed

In order to start using your Linnia Box you need to use 3 services: IPFS, Ethereum Client (With Linnia SC), Linnia-Server



## Quick Start

For the quick start we are going to use Infura (IPFS), Ropsten (Ethereum Client), AWS Linnia-Server

This is the easiest way to start but if you have time we recommend to take a look at the full installation in which we explain how to run a local version of all of this services which is very helpful for development purposes. (Check the full installation here)


Go to your Metamask and switch to Ropsten Test Network

#### Run

```
npm start
```

Congrats your Linnia App is running!!



## Request User to Share file

If you created an app using the Linnia Box and you want to request a user to share specific file with you, you can send a URL that will ask the user only for the Encryption Private Key and to sign the transaction in MetaMask.

Replace the following variables in the following URL and send to the owner of that data:

- LINNIA_BOX_URL
- YOUR_ENCRYPTION_PUBLIC_KEY
- YOUR_ETHEREUM_ADDRESS
- DATA_HASH_YOU_WANT

```
[LINNIA_BOX_URL]/permissions?viewerEncyptionPublicKey=[YOUR_ENCRYPTION_PUBLIC_KEY]&viewerEthereumAddress=[YOUR_ETHEREUM_ADDRESS]&dataHash=[DATA_HASH_YOU_WANT]
```



## Encryption Keys

To learn more about encryption patterns and how Linnia uses them, go [HERE](https://github.com/ConsenSys/linnia-resources/blob/master/KEYS.md)



## Create User and Upload Data

In order to create the keys, register a user and upload data to Linnia you can use our Linnia Faucet [HERE](https://consensys.github.io/linnia-faucet/)



## Test Users

In order to test Linnia you can use the following keys. We already uploaded data of 40 different diabetic patients (This is not real data)



### **Ethereum Address**es

Here you can check the Ethereum Addresses of each of the test users, click [HERE](TestEthereumAddresses.md)



### **Encryption Private Keys** (This are use to decrypt)

In order to decrypt the test files that we uploaded to the contracts, click [HERE](TestEncryptionPrivateKeys.md)



### **Encryption Public Key** (This are use to share data)

In order to share a files you have to use the public key of the receiver, to find them click [HERE](TestEncryptionPublicKeys.md)

