import * as firebase from "firebase";
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyCGWqYnp6-WheXh_YGFgTzYcrwgLobtdrk",
  authDomain: "pet-search-soft3888.firebaseapp.com",
  databaseURL: "https://pet-search-soft3888.firebaseio.com",
  projectId: "pet-search-soft3888",
  storageBucket: "pet-search-soft3888.appspot.com",
  messagingSenderId: "746108898403",
  appId: "1:746108898403:web:687dc2af33699a018dfc56",
  measurementId: "G-CS3BZEL2WX",
};

firebase.initializeApp(config);
const auth = firebase.auth();
const db = firebase.firestore();
export { auth, db };
