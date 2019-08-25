import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

const apiKey = `${process.env.FIREBASE_KEY}`;

const firebaseConfig = {
  apiKey: `${apiKey}`,
  authDomain: 'team-app-149fe.firebaseapp.com',
  databaseURL: 'https://team-app-149fe.firebaseio.com',
  projectId: 'team-app-149fe',
  storageBucket: '',
  messagingSenderId: '466486957873',
  appId: '1:466486957873:web:599478ef0c1284cb'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');
export { firebase, firebaseMatches };
