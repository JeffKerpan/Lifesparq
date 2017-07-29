'use strict';

angular.module('lifesparqApp')
  .controller('signUpUserCtrl', function ($scope, $log, $localStorage, $http) {
    $scope.firstName = $localStorage.firstName;
    $scope.lastName = $localStorage.lastName;
    $scope.emailAddress = $localStorage.emailAddress;

    $scope.user = {
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      emailAddress: $scope.emailAddress,
      password: '',
      sport: ''
    }

    $scope.secondPassword = '';

    $scope.passwordError = '';


    $scope.validatePasswords = function () {
      var firstPassword = $scope.user.password;
      var secondPassword = $scope.secondPassword;

      if (firstPassword.length && secondPassword.length) {
        if (firstPassword !== secondPassword) {
          $scope.passwordError = 'Passwords must match';
        } else {
          $scope.passwordError = '';
        }
      }
    }

    $scope.submitUser = function() {
      $localStorage.$reset();

      $http({
        url: 'http://localhost:3000/newuser',
        method: 'POST',
        data: {
          tableName: 'users',
          firstName: $scope.user.firstName,
          lastName: $scope.user.lastName,
          password: $scope.user.password,
          emailAddress: $scope.user.emailAddress,
          sport: $scope.user.sport
        }
      }).then(response => {
        console.log(response);
      })
    }


  });
