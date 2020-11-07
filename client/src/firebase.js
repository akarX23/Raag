import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAlDl0FJkkkA6RDFx1cEs_bfI74gO8y63o",
  authDomain: "raag-d3fba.firebaseapp.com",
  databaseURL: "https://raag-d3fba.firebaseio.com",
  projectId: "raag-d3fba",
  storageBucket: "raag-d3fba.appspot.com",
  messagingSenderId: "635395358403",
  appId: "1:635395358403:web:15faaf91c107f2028dac76",
  measurementId: "G-7ZSE1CQJ55",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
