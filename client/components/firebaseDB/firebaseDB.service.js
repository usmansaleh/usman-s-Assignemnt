'use strict';
import firebase from 'firebase';
const angular = require('angular');


/*@ngInject*/
export function firebaseDBService() {

  console.log("inside firebaseDB service");
  var firebaseDB = {
    updateDataForUser:updateDataForUser,
    removeDataInFirebaseDB : removeDataInFirebaseDB,
    getDataForReference: getDataForReference,
    writeDataInFirebaseDB: writeDataInFirebaseDB
  };

  return firebaseDB;
}

function getDataForReference(reference) {
  return new Promise(function(resolve, reject) {
    var databaseReference = firebase.database().ref(reference);
    databaseReference.on("value",
      function(data) {
        console.log("Firebase Service: ", data.val());
        resolve(data.val());
      },
      function(error) {
        console.error(error);
        reject(error);
      }
    );
  });
}

function writeDataInFirebaseDB(reference, data) {
  return new Promise(function(resolve, reject) {
    firebase.database().ref(reference).push(data, function(error) {
      if (error) {
        reject(error);
      } else {
        resolve("Data saved successfully");
      }
    });
  });
}

function removeDataInFirebaseDB(data) {
  console.log('data for delete',data);
  return new Promise(function(resolve, reject) {
    var databaseReference = firebase.database().ref('users').child(data.uid).remove(); // limitToLast(1) returns the very latest result
    var DBref = firebase.database().ref('users');
    DBref.on("value",
      function(data) {
        console.log("query: ", data.val());
        resolve(data.val());
      },
      function(error) {
        console.error("query: ", error);
        reject(error);
      }
    );
  });
}

function updateDataForUser(data) {
   return new Promise(function(resolve, reject) {
    var databaseReference = firebase.database().ref('users').child(data.uid).update(data); // limitToLast(1) returns the very latest result
    var DBref = firebase.database().ref('users');
    DBref.on("value",
      function(data) {
        console.log("query: ", data.val());
        resolve(data.val());
      },
      function(error) {
        console.error("query: ", error);
        reject(error);
      }
    );
  });
}

export default angular.module('firebeaseDBService', [])
  .service('FirebaseDB', firebaseDBService)
  .name;
