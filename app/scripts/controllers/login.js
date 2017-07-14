'use strict';

angular.module('lifesparqApp')
  .controller('loginCtrl', function ($scope, $mdDialog) {
    $scope.showSingleUserSignup = function(ev) {
    $mdDialog.show({
      controller: dialogController,
      templateUrl: 'signupFormSingle.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    });
  };

  $scope.user = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  function dialogController($scope, $mdDialog) {

    $scope.hide = () => {
      $mdDialog.hide();
    }

    $scope.cancel = () => {
      $mdDialog.cancel();
    }

    $scope.answer = (answer) => {
      $mdDialog.hide(answer);
    }

    $scope.test = function() {
      console.log('yippee');
    }
}
  });
