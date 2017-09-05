(function() {
  'use strict';

  angular.module('lifesparqApp')

    .controller('paymentCtrl', function ($scope, $mdDialog, $http, $location, $localStorage, $cookies, paymentService) {

      $scope.loadStripeForm = function() {
        paymentService.loadStripeForm();
      }

      $scope.loadStripeForm();

      // $scope.submitFeedback = function() {
      //   feedbackService.sendFeed($scope.user)
      //   .then(({ data }) => {
      //     $scope.confirmed = data;
      //     console.log($scope.confirmed, 'controller');
      //     $scope.showFeedbackSent();
      //     $location.path('/profile');
      //
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      // };

      $scope.showPaymentSent = function () {
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
