// Initialize Firebase
var firebase = require('firebase');

  var config = {
    apiKey: "AIzaSyBpeaZWIf5ES3it4JYy7pOVa9V7a2IebSY",
    authDomain: "fir-events-32d5f.firebaseapp.com",
    databaseURL: "https://fir-events-32d5f.firebaseio.com",
    projectId: "fir-events-32d5f",
    storageBucket: "fir-events-32d5f.appspot.com",
    messagingSenderId: "432861475413"
  };
  
var app = firebase.initializeApp(config);