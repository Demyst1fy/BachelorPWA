import firebase from "firebase/compat/app";
import "firebase/compat/performance";

const firebaseConfig = {
  apiKey: "placeholder",
  authDomain: "placeholder",
  projectId: "placeholder",
  storageBucket: "placeholder",
  messagingSenderId: "placeholder",
  appId: "placeholder",
  measurementId: "placeholder",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const perf = firebase.performance();

export { firebase, perf };
