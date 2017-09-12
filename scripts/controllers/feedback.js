(function() {
  'use strict';

  angular.module('lifesparqApp')
    .controller('feedbackCtrl', function ($scope, $mdDialog, $http, $location, $localStorage, $cookies, feedbackService) {

      $scope.confirmed = 'Feedback Sent';

      $scope.submitFeedback = function() {
        feedbackService.sendFeed($scope.user)
        .then(({ data }) => {
          $scope.confirmed = data;
          console.log($scope.confirmed, 'controller');
          $scope.showFeedbackSent();
          $location.path('/profile');

        })
        .catch(err => {
          console.log(err);
        });
      };

      $scope.showFeedbackSent = function () {
        $mdDialog.show({
          controller: ConfirmController,
          templateUrl: 'feedbackSent.tmpl.html',
          parent: angular.element(document.body),
          locals: {
            confirmed: $scope.confirmed
          }
        })
      };

      function ConfirmController($scope, $mdDialog, confirmed) {

        $scope.hideConfirm = function () {
          $scope.confirmed = confirmed;
          $mdDialog.hide();
        }

      }

  });

}());
