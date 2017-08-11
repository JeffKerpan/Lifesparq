(function() {

'use strict';

angular
  .module('lifesparqApp', [
    'ngMaterial',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'imageCropper'
  ])
  .config(function ($routeProvider, $mdThemingProvider, $cookiesProvider, $locationProvider) {
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
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginCtrl',
        controllerAs: 'login'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'profileCtrl',
        controllerAs: 'profile'
      })
      .when('/moreinfocoach', {
        templateUrl: 'views/signUpMoreInfoCoach.html',
        controller: 'signUpCoachCtrl',
        controllerAs: 'signUpCoach'
      })
      .when('/moreinfosingle', {
        templateUrl: 'views/signUpMoreInfoUser.html',
        controller: 'signUpUserCtrl',
        controllerAs: 'signUpUser'
      })
      .when('/superlogin', {
        templateUrl: 'views/superLogin.html',
        controller: 'superCtrl',
        controllerAs: 'super'
      })
      .when('/upload', {
        templateUrl: 'views/upload.html',
        controller: 'uploadCtrl',
        controllerAs: 'upload'
      })
      .otherwise({
        redirectTo: '/'
      });

      // $locationProvider.html5Mode(true);

      $mdThemingProvider
      .theme('dark-grey').backgroundPalette('grey').dark();
      $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('yellow')
        .dark();

      //figure out what the hell this does.
      $cookiesProvider
      .defaults = {
        path: '/invalid-path'
      };
  });
})();
