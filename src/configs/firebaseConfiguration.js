import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: 'AIzaSyDfdHdd6ca9CVZ1sl0zxnvcfzz8xSgzzJY',
    authDomain: 'reactjs-slack-clone-811f3.firebaseapp.com',
    projectId: 'reactjs-slack-clone-811f3',
    storageBucket: 'reactjs-slack-clone-811f3.appspot.com',
    messagingSenderId: '158898855237',
    appId: '1:158898855237:web:3baa187e294d76e47e722c',
    measurementId: 'G-HPTMXZ469B',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };