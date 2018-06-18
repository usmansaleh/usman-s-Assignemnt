import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';


export class MainController {
  $http;
  socket;
  awesomeThings = [];
  newThing = '';
  FirebaseAuth;
  firebaseDB;

  /*@ngInject*/
  constructor($http, $scope, socket, $window, FirebaseAuth, FirebaseDB) {
    console.log("Main Controller");
    var vm = this;
    vm.$http = $http;
    vm.socket = socket;
    vm.allLoaded = false;
    vm.scope = $scope;
    vm.FirebaseAuth = FirebaseAuth;
    vm.firebaseDB = FirebaseDB;
    console.log('user list');
    vm.firebaseDB.getDataForReference()
      .then(function(response) {
        console.log('hur ta aja', response.users);
        vm.users = response.users;
        vm.scope.$apply(function() {
          vm.allLoaded = true;
        });
      })
      .catch(function(error) {
        console.log("error in fetching data: ", error);
      });

    console.log("main component fcalled");
  }


  $onInit() {

  }

  Add(data)
  {
    var vm = this;
    console.log(data);
    vm.firebaseDB.writeDataInFirebaseDB(data).then(function(data) {
      // console.log('what is in data');
      // vm.users = data;
      // vm.scope.$apply(function() {
      //   vm.allLoaded = true;
      // });
    })
      .catch(function(error) {
        console.log("caling firebase DB", error);
    });

  }

  update(data) {
    var vm = this;
    console.log(data);
    vm.firebaseDB.updateDataForUser(data).then(function(data) {
      console.log('what is in data');
      vm.users = data;
      vm.scope.$apply(function() {
        vm.allLoaded = true;
      });
    })
      .catch(function(error) {
        console.log("caling firebase DB", error);
        // vm.state.go('tesseractTest');
    });
  }

  delete(thing) {
    var vm = this;
    vm.firebaseDB.removeDataInFirebaseDB(thing).then(function(){
      vm.firebaseDB.getDataForReference()
      .then(function(response) {
        console.log('hur ta aja', response.users);
        vm.users = response.users;
        vm.scope.$apply(function() {
          vm.allLoaded = true;
        });
      })
      .catch(function(error) {
        console.log("error in fetching data: ", error);
      });
    });
  }
}

export default angular.module('usmanAssignement.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
    controllerAs: 'vm'
  })
  .name;
