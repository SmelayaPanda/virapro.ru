import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
import 'firebase/firestore'

var config

if (process.env.NODE_ENV === 'production') {
  config = {
    apiKey: "AIzaSyDRGcfICNUp8SqmJ_Belmv55e6i7__ikWM",
    authDomain: "plumbing-prod.firebaseapp.com",
    databaseURL: "https://plumbing-prod.firebaseio.com",
    projectId: "plumbing-prod",
    storageBucket: "plumbing-prod.appspot.com",
    messagingSenderId: "463779483968"
  }
} else {
  config = {
    apiKey: "AIzaSyCUJ9BwnxkL8UnSyUh6FzY4rbZpwmojcic",
    authDomain: "nuxt-shop-205015.firebaseapp.com",
    databaseURL: "https://nuxt-shop-205015.firebaseio.com",
    projectId: "nuxt-shop-205015",
    storageBucket: "nuxt-shop-205015.appspot.com",
    messagingSenderId: "457264938545"
  };
}

firebase.apps && !firebase.apps.length ? firebase.initializeApp(config) : ''
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const db = firebase.database();
firebase.firestore().settings({timestampsInSnapshots: true})
export const fs = firebase.firestore();

export default firebase
