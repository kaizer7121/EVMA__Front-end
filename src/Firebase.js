import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyAtaKG7tVqz1PX4XJYTc3jczTRzYb5Tv44",
  authDomain: "evma-fpt.firebaseapp.com",
  projectId: "evma-fpt",
  storageBucket: "evma-fpt.appspot.com",
  messagingSenderId: "905917935533",
  appId: "1:905917935533:web:5234042329374830a9bb24"
};

export const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccess: () => false,
  },
};

firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage()

export default firebase;
