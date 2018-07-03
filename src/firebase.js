import firebase from 'firebase'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCvXQsdNo4l8Z76YabUg141wKkyoHvOmg8",
    authDomain: "linnia-test.firebaseapp.com",
    databaseURL: "https://linnia-test.firebaseio.com",
    projectId: "linnia-test",
    storageBucket: "",
    messagingSenderId: "21223694064"
};
firebase.initializeApp(config)
export default firebase
