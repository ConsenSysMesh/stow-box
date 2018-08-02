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



### Decryption keys

In order to decrypt the test files that we uploaded to the contracts, click [HERE](TestPrivateKeys.md)



### Sharing keys

In order to share a files you have to use the public key of the receiver, to find them click [HERE](PublicKeys.md)



### Addresses

Here you can check the address of each test user, click [HERE](Addresses.md)
