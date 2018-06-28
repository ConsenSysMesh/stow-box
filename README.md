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
cd node_modules/linnia
npm install
cd ../..
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

### Config

In order to config which instances of the services do you want to use. You have to create environmental variables in a  `.env` file in the root of the project with the following variables:

#### .env (Sample file, this file has to be in the root of the project)

```
LINNIA_ETH_PROVIDER=http://localhost:7545
LINNIA_IPFS_HOST=ipfs.infura.io
LINNIA_IPFS_PORT=5001
LINNIA_IPFS_PROTOCOL=https
LINNIA_CONTRACT_GAS=4000000
LINNIA_HUB_ADDRESS=0xc39f2e4645de2550ee3b64e6dc47f927e8a98934
LINNIA_SEARCH_URI=[TODO PASTE AWS SERVER ADDRESS HERE]
```

Go to your Metamask and swich to Ropsten Test Network

#### Run

```
npm start
```

Congrats your Linnia App is running!!







## Full installation

For the full installation we are going to run out local verion of IPFS, our local Ethereum Client with the linnia contracts deployed there and our local verion of Linnia-Server.

This is the recommended setup for development purposes



### Services

### 1. IPFS

IPFS is a storage network that we are going to use in order to store the encrypted data of the users.

For development purposes we strongly recommend to use a local version of IPFS, this way you don't waste resource of the Infura network (Have in mind that when you add a file to Infura it will be there forever)

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

#### Change env IPFS variables (.env file)

```
..
LINNIA_IPFS_HOST=localhost
LINNIA_IPFS_PORT=5001
LINNIA_IPFS_PROTOCOL=http
...
```







### 2. Ethereum Network

#### In order to launch your local Ethereum Client

First you have to run your local ethereum client. In order to do this, you can use Ganache. Open another terminal window to keep your client running, and run the following commands:

#### Install Ganache if you don't have it already

```
npm install -g ganache-cli
```

#### Run your local Ethereum Client (This will launch your client in the localhost port 7545)

```
npm run ganache
```

Now go to your Metamask and swich to Custom RPC and set the New RPC URL to: `http://localhost:7545`

Keep that running and continue in another terminal window

#### Now you have to deploy the Linnia Smart Contracts to your local Ethereum Client

In order to deploy the contracts to the local ethereum client you just launch run:

```
node scripts/deploy-linnia.js
```

You will see an output like this:

```
Linnia instance deployed. Hub address is
0x8acee021a27779d8e98b9650722676b850b25e11
```

Then copy the address, "0x..." and paste it in the .env file

#### Change env Linnia HUB variable (.env file)

```
..
LINNIA_HUB_ADDRESS=[PASTE ADDRESS HERE]
...
```







### 3. Linnia Server

The Linnia Server is a server that uses Node and Express with a Postgres DB and store every Log that the Linnia Smart Contracts emit. This is very useful to query the data.

#### In order to launch your local Linnia Server

If you don't want to trust the Linnia server, you can run your version of the server

Check the repo and follow the instructions here: https://github.com/ConsenSys/linnia-server

After you have your server running, set the URI in the env variables

```
...
LINNIA_SEARCH_URI=http://localhost:5002
```

In the code above the linnia-server is running in the port 5002. Be careful that you have the linnia-server running in the port that you set here and also that the linnia-server is not using the same port as the linnia-box



### Run

Run the linnia box, go to linnia-box directory and run:

```
npm start
```

Congrats your Linnia App is running!!



### Run Tests

```
npm run test
```

