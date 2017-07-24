'use strict';

angular.module('lifesparqApp')
  .controller('loginCtrl', function ($scope, $mdDialog, $http, $location, $localStorage) {
    $scope.showSingleUserSignup = function(ev) {
      $mdDialog.show({
        controller: userController,
        templateUrl: 'signupFormSingle.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      });
  };
    $scope.showTeamSignup = function(ev) {
      $mdDialog.show({
        controller: userController,
        templateUrl: 'signupFormTeam.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      });
    }
    $scope.showMemberLogin = function (ev) {
      $mdDialog.show({
        controller: userController,
        templateUrl: 'memberLogin.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      })
    }

  $scope.user = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: ''
  };

  $scope.error = '';


  function userController($scope, $mdDialog) {

    $scope.hide = () => {
      $mdDialog.hide();
    }

    $scope.cancel = () => {
      $mdDialog.cancel();
    }

    $scope.answer = (answer) => {
      $mdDialog.hide(answer);
    }

    $scope.loginUser = function() {
      $http({
        url: 'http://localhost:3000/compare',
        method: 'POST',
        data: {
          emailAddress: $scope.user.emailAddress,
          password: $scope.user.password
        }
      }).then(response => {
        if (response.data.error) {
          $scope.error = response.data.message;
        } else if (response.data.success) {
          $location.path('/profile');
        } else {
          console.log('That login didn\'t work');
        }
      })
    }

    $scope.submitUser = function() {
      $http({
        url: 'http://localhost:3000/newUser',
        method: 'POST',
        data: {
          firstName: $scope.user.firstName,
          lastName: $scope.user.lastName,
          emailAddress: $scope.user.emailAddress,
          password: $scope.user.password
        }
      }).then(response => {
        $localStorage.default({
          emailAddress: $scope.user.emailAddress
        })
        $location.path('/moreinfo');
      })
    }

    $scope.submitCoach = function() {
      $localStorage.firstName = $scope.user.firstName;
      $localStorage.lastName = $scope.user.lastName;
      $localStorage.emailAddress = $scope.user.emailAddress;
      $location.path('/moreinfo');
    }

  }
});