import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCA5oQunc91XUn80NvPNdOLHYPUQ8euSJA",
    authDomain: "bbsb-bd25d.firebaseapp.com",
    databaseURL: "https://bbsb-bd25d.firebaseio.com",
    projectId: "bbsb-bd25d",
    storageBucket: "bbsb-bd25d.appspot.com",
    messagingSenderId: "316101090838"
};

firebase.initializeApp(config);

firebase.firestore().settings({ timestampsInSnapshots : true });
export default firebase;
