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
      .when('/feedback', {
        templateUrl: 'views/feedback.html',
        controller: 'feedbackCtrl',
        controllerAs: 'feedback'
      })
      .when('/indPayment', {
        templateUrl: 'views/indPayment.html',
        controller: 'paymentCtrl',
        controllerAs: 'payment'
      })
      .when('/teamPayment', {
        templateUrl: 'views/teamPayment.html',
        controller: 'paymentCtrl',
        controllerAs: 'payment'
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
      .when('/moreinfoteammember/:teamId/:firstName/:lastName', {
        templateUrl: 'views/moreinfoteammember.html',
        controller: 'signUpTeamMemberCtrl',
        controllerAs: 'signUpTeamMember'
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
      .when('/videos', {
        templateUrl: 'views/videos.html',
        controller: 'videosCtrl',
        controllerAs: 'videos'
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.html5Mode(true);

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
