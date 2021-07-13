// For Firebase JS SDK v7.20.0 and later, measurementId is optional


import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    
    apiKey: "AIzaSyBkzatIFbiBc1mzK1hULyxC7NT8p4t4BoE",
    authDomain: "chatappbaja.firebaseapp.com",
    projectId: "chatappbaja",
    storageBucket: "chatappbaja.appspot.com",
    messagingSenderId: "114697301862",
    appId: "1:114697301862:web:8881bd8088b5674fbf22a7",
    measurementId: "G-1DK8JD8VPJ"
 
  })

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
export {db, auth, storage}; 