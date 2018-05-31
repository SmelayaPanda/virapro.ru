import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'

var config = {
  apiKey: "AIzaSyCUJ9BwnxkL8UnSyUh6FzY4rbZpwmojcic",
  authDomain: "nuxt-shop-205015.firebaseapp.com",
  databaseURL: "https://nuxt-shop-205015.firebaseio.com",
  projectId: "nuxt-shop-205015",
  storageBucket: "nuxt-shop-205015.appspot.com",
  messagingSenderId: "457264938545"
};

!firebase.apps.length ? firebase.initializeApp(config) : ''
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const DB = firebase.database();
export default firebase
