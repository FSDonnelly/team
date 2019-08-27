import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

const apiKey = `${process.env.REACT_APP_FIREBASE_KEY}`;

const firebaseConfig = {
  apiKey: `${apiKey}`,
  authDomain: 'team-app-149fe.firebaseapp.com',
  databaseURL: 'https://team-app-149fe.firebaseio.com',
  projectId: 'team-app-149fe',
  storageBucket: 'gs://team-app-149fe.appspot.com/',
  messagingSenderId: '466486957873',
  appId: '1:466486957873:web:599478ef0c1284cb'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');
const firebaseTeams = firebaseDB.ref('teams');
const firebasePlayers = firebaseDB.ref('players');
const firebasePromotions = firebaseDB.ref('promotions');
export {
  firebase,
  firebaseMatches,
  firebasePlayers,
  firebasePromotions,
  firebaseTeams,
  firebaseDB
};
