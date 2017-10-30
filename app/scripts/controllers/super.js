'use strict';

angular.module('lifesparqApp')
  .controller('superCtrl', function ($scope, $log, $localStorage, $http, $location, $cookies) {

    $scope.user = {
      emailAddress: '',
      password: ''
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
