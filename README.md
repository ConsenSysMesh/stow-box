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

