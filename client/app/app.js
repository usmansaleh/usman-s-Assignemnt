'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import 'angular-socket-io';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import 'angular-validation-match';

import {
  routeConfig
} from './app.config';


import AngularToastr from 'angular-toastr';
import _Auth from '../components/auth/auth.module';
import _FirebaseAuth from '../components/firebaseService/firebaseAuth.service';
import _FirebaseDB from '../components/firebaseDB/firebaseDB.service';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';;
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';

import './app.css';


angular.module('usmanAssignement', [
    ngCookies,
    ngResource,
    ngSanitize,
    'btford.socket-io',
    uiRouter,
    uiBootstrap,
    AngularToastr,
    _Auth,
    _FirebaseAuth,
    _FirebaseDB,
    'validation.match',
    navbar,
    footer,
    main,
    constants,
    socket,
    util
  ])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth, FirebaseAuth, $window) {
    'ngInject';
    $rootScope.$on('$stateChangeStart', function(event, next) {
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['usmanAssignement'], {
      strictDi: true
    });
  });
