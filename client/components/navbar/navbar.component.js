'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  // menu = [{
  //   title: 'Home',
  //   state: 'main'
  // }];

  menu = []
  isLoggedIn: Function;
  isAdmin: Function;
  getCurrentUser: Function;
  isCollapsed = true;

  constructor(FirebaseAuth) {
    'ngInject';

    this.isLoggedIn = FirebaseAuth.isSignedIn;
    this.isAdmin = FirebaseAuth.isAdmin;
    console.log('is admin:', this.isAdmin);
    this.getCurrentUser = FirebaseAuth.getCurrentUser;

  }
}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
