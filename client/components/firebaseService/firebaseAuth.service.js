'use strict';
import firebase from 'firebase';
const angular = require('angular');


//response // status:boolean, message:string, errorCode: default should be -1
/**
  status: true if operation is successful, false if operation fails
  message: success if operation is successful, errorMessage in case of failure
  errorCode: -1 if operation is successful, errorCode in case of failure
**/

/*@ngInject*/
export function firebaseAuth() {
  'ngInject';

  // AngularJS will instantiate a singleton by calling 'new' on this function
  initFirebase();

}

function initFirebase() {
  console.log('initFirebase::Client');

  var config = {
    apiKey: "AIzaSyAWXzax6YPVscUs_sCDglzYknlmprf0xq4",
    authDomain: "assignment-2e558.firebaseapp.com",
    databaseURL: "https://assignment-2e558.firebaseio.com",
    projectId: "assignment-2e558",
    storageBucket: "assignment-2e558.appspot.com",
    messagingSenderId: "300076334364"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  } else
    console.log('firebase is already intialized');
}


export default angular.module('usmanAssignement.firebaseService', [])
  .service('FirebaseAuth', firebaseAuth)
  .name;
