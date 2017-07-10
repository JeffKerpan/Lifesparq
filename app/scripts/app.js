(function() {

'use strict';

/**
 * @ngdoc overview
 * @name lifesparqApp
 * @description
 * # lifesparqApp
 *
 * Main module of the application.
 */
angular
  .module('lifesparqApp', [
    'ngMaterial',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $mdThemingProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
      $mdThemingProvider
      .theme('dark-grey').backgroundPalette('grey').dark();
  });
})();
