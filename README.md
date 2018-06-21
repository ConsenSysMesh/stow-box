# Linnia, truffle box starter kit



In order to run the server you should create a file called `firebase.js` with your firebase settings, below there is a sample file

### firebase.js

```
import firebase from 'firebase'

// Initialize Firebase
var config = {
    apiKey: [API KEY],
    authDomain: [AUTH DOMAIN],
    databaseURL: [DB URL],
    projectId: [PROJECT ID],
    storageBucket: "",
    messagingSenderId: [SENDER ID]
};
firebase.initializeApp(config)
export default firebase
```



You also need to add a .env file with the following settings

### .env

ENV variables sample file `.env`

```
LINNIA_ETH_PROVIDER=http://localhost:8545
LINNIA_IPFS_HOST=ipfs.infura.io
LINNIA_IPFS_PORT=5001
LINNIA_IPFS_PROTOCOL=https
LINNIA_CONTRACT_GAS=4000000
LINNIA_HUB_ADDRESS=0x8cdaf0cd259887258bc13a92c0a6da92698644c0
```

