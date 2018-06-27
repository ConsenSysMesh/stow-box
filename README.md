# Linnia, truffle box starter kit

This is a starter kit to start developing your app using the decentralized protocol Linnia as the backend and data manager.. Linnia is going to be used to store any data you want and relate it to your users.

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
cd node_modules/linnia
npm install
cd ../..
```



### Metamask

In order to be able to fully use your starter kit you need to download Metmask to manage your Web3 instance and you connection to the Ethereum Blockchain Network.

If you don't have Metamask yet, go to the following link, download and install it https://metamask.io/



## Run

You have everything setup, now we have to run all the services we need in order to start running our first Linnia app.

There are 3 services the the starter kit need. For all of them you have the default runnins verision or you local one.



### Config

In order to config which instances of the services do you want to use. You have to create enviromental variables in a  `.env` file with the following variables

#### .env (Sample file, this file has to be in the root of the project)

```
LINNIA_ETH_PROVIDER=http://localhost:8545
LINNIA_IPFS_HOST=ipfs.infura.io
LINNIA_IPFS_PORT=5001
LINNIA_IPFS_PROTOCOL=https
LINNIA_CONTRACT_GAS=4000000
LINNIA_HUB_ADDRESS=0x8cdaf0cd259887258bc13a92c0a6da92698644c0
LINNIA_SEARCH_URI=http://localhost:5002
```



### Services

### 1. IPFS

IPFS is a storage network that we are going to use in order to store the encrypted data of the users.

#### Our recomendation is to use Infura (For more information https://infura.io/)

If you want to use infura you should the set the following env variables in the env file

```
...
LINNIA_IPFS_HOST=ipfs.infura.io
LINNIA_IPFS_PORT=5001
LINNIA_IPFS_PROTOCOL=https
...
```

For development purposes we strongly recomend to use a local version of IPFS, this way you don't waste resource of the infura network (Have in mind that when you add a file to infura it will be there forever)

#### In order to launch your local version of IPFS

Install IPFS if you don't have it already:

- Download IPFS from <https://ipfs.io/docs/install/>

- For Mac:

- Navigate to the folder and run:

  ```
  sudo mv ipfs /usr/local/bin/ipfs
  ```

- For Windows:

- After downloading, unzip the archive, and move `ipfs.exe` somewhere in your `%PATH%`

- Run IPFS locally

```
ipfs init
ipfs daemon
```



### 2. Ethereum Network

#### Our recomendation is to use our TestNet version (NOT AVAILABLE YET)

If you want to use this version, you should set the following in your env file

```
...
LINNIA_HUB_ADDRESS=[TODO]
...
```

You also need to switch you Metamask app to Ropsten Test Network

#### In order to launch your local Ethereum Client

First you have to run your local ethereum client. In order to do this, you can use Ganache. Open another terminal window to keep your client running, and run the following commands:

#### Install Ganache if you don't have it already

```
npm install -g ganache-cli
```

#### Run your local Ethereum Client (This will launch your client in the localhost port 8545)

```
ganache-cli -p 8545 -i 5777 -m 'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat'
```

#### Now you have to deploy the Linnia Smart Contracts to your local Ethereum Client

To do this, you have to download the Linnia Library. With this library you can deploy the Linnia contracts to the network.

- First go to https://github.com/ConsenSys/linnia-js/ and install the library locally

- After you have Linnia JS installed, use the library to deploy the contracts:

  - In order to deploy the contracts, go to the Linnia-js directory and run the following commands:

  - ```
    node
    var Linnia = require('./lib')
    var Web3 = require('web3')
    var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    const ipfsapi = require('ipfs-api')
    const ipfs = new ipfsapi({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})
    var linnia = Linnia.deploy(web3, ipfs, { from: web3.eth.accounts[0], gas: 4000000 })
    linnia
    ```

- After that you will find in the output, close to the bottom a line like this

  `_hubAddress: '0x8cdaf0cd259887258bc13a92c0a6da92698644c0' },` 

- Take the address and paste it in the env file

  ```
  ...
  LINNIA_HUB_ADDRESS=[Paste address here]
  ...
  ```

You also need to switch you Metamask app to localhost 8545



### 3. Linnia Server

#### The fast and easy way is to use our deployed central server  (NOT AVAILABLE YET)

In order to use our server you have to setup the following in you env file

```
...
LINNIA_SEARCH_URI=[TODO Server URI]
```

#### Run your version of the server

If you don't want to trust the Linnia server, you can run your version of the server

Check the repo and follow the instructions here: https://github.com/ConsenSys/linnia-server

After you have your server running, set the URI in the env variables

```
...
LINNIA_SEARCH_URI=http://localhost:5002
```

In the code above the linnia-server is running in the port 5002. Be careful that you have the linnia-server running in the port that you set here and also that the linnia-server is not using the same port as the linnia-box



### After you have the 3 services running

Run the linnia box, go to linnia-box directory and run:

```
npm start
```

Then go to your browser and check localhost:3000 or whatever port you use for the linnia box.

Congrats your Linnia App is running!!

