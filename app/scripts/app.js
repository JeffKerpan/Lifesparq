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
    'ngStorage'
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
      .otherwise({
        redirectTo: '/'
      });
      $mdThemingProvider
      .theme('dark-grey').backgroundPalette('grey').dark();
      $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('yellow')
        .dark();
  });
})();
