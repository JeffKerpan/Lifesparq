'use strict';

angular.module('lifesparqApp')
  .controller('loginCtrl', function ($scope, $mdDialog, $http, $location) {
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
          console.log('Sad shit');
        }
      })
    }

    $scope.submitUser = function(coachBoolean) {
      $http({
        url: 'http://localhost:3000/new',
        method: 'POST',
        data: {
          emailAddress: $scope.user.emailAddress,
          password: $scope.user.password,
          coach: coachBoolean
        }
      }).then(response => {
        console.log(response);
      })
    }

  }
});
