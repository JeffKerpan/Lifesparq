'use strict';

angular.module('lifesparqApp')
  .controller('superCtrl', function ($scope, $log, $localStorage, $http, $location) {

    $scope.user = {
      emailAddress: '',
      password: ''
    }

    $scope.login = function () {
      $http({
        url: 'https://stormy-springs-94108.herokuapp.com/super/compare',
        method: 'POST',
        data: $scope.user
      }).then(response => {
        if (response.data.success) {
          $location.path('/upload');
        }
        console.log(response);
      })
    }
  });
