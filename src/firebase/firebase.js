import * as firebase from 'firebase';

/*const prodConfig = {
  apiKey: YOUR_API_KEY,
  authDomain: YOUR_AUTH_DOMAIN,
  databaseURL: YOUR_DATABASE_URL,
  projectId: YOUR_PROJECT_ID,
  storageBucket: '',
  messagingSenderId: YOUR_MESSAGING_SENDER_ID,
};

const devConfig = {
  apiKey: YOUR_API_KEY,
  authDomain: YOUR_AUTH_DOMAIN,
  databaseURL: YOUR_DATABASE_URL,
  projectId: YOUR_PROJECT_ID,
  storageBucket: '',
  messagingSenderId: YOUR_MESSAGING_SENDER_ID,
};*/

const prodConfig = {
};

const devConfig = {
  apiKey: "AIzaSyBJtron3FwTXHYREllwpX9mcZG8iiX1RLY",
  authDomain: "feed-8fded.firebaseapp.com",
  databaseURL: "https://feed-8fded.firebaseio.com",
  projectId: "feed-8fded",
  storageBucket: "feed-8fded.appspot.com",
  messagingSenderId: "347071306596"
};
console.log("aqui firebase");
console.log(process.env.NODE_ENV);
const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};
