'use strict';

angular.module('lifesparqApp')
  .controller('superCtrl', function ($scope, $log, $localStorage, $http, $location, $cookies) {

    $scope.user = {
      emailAddress: '',
      password: ''
    }
    $scope.token = $cookies.get('Authorization');

    $scope.skipLogin = function (token) {
      $http.defaults.headers.common.Authorization = `Bearer ${token}`;
      return $http({
        url: 'http://localhost:3000/super/verify',
        method: 'POST'
      })
      .then(result => {
        if (result.data === true) {
          $location.path('/upload');
        }
      })
    }

    if ($scope.token) {
      console.log($scope.token);
      $scope.skipLogin($scope.token);
    }

    $scope.login = function () {
      $http({
        url: 'http://localhost:3000/super/compare',
        method: 'POST',
        data: $scope.user
      }).then(response => {
        if (response.data) {
          var date = new Date();
          date.setTime(date.getTime()+((60*1000)*120));
          $cookies.put('Authorization', response.data.token, {'expires': date});
          $location.path('/upload');
        }
      })
    }
  });
