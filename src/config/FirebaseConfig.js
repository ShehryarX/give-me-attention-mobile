import * as firebase from "firebase";

const appConfig = {
  apiKey: "AIzaSyCmHUJygwGTX8kM0I60KH5FztDr7yQsheg",
  authDomain: "give-me-attention-72cd4.firebaseapp.com",
  databaseURL: "https://give-me-attention-72cd4.firebaseio.com",
  projectId: "give-me-attention-72cd4",
  storageBucket: "give-me-attention-72cd4.appspot.com",
  messagingSenderId: "307141263949",
  appId: "1:307141263949:web:822b5c9b0b3ec7884d1204",
  measurementId: "G-69JZP2BF66",
};

if (!firebase.apps.length) {
  firebase.initializeApp(appConfig);
}
