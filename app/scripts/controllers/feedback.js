'use strict';

angular.module('lifesparqApp')
  .controller('feedbackCtrl', function ($scope, $http, $location, $localStorage, $cookies) {

    $scope.master = {};

    $scope.update = function(user) {
      $scope.master = angular.copy(user);
    };

    $scope.reset = function() {
      $scope.user = angular.copy($scope.master);
    };

    $scope.submit = function() {
      if ($scope.user){
        console.log($scope.user);
      }
    };

    $scope.reset();


  //   $scope.showTeamSignup = function(ev) {
  //     $mdDialog.show({
  //       controller: userController,
  //       templateUrl: 'signupFormTeam.tmpl.html',
  //       parent: angular.element(document.body),
  //       targetEvent: ev,
  //       clickOutsideToClose: true
  //     });
  //   }
  //
  //   $localStorage.$reset();
  //
  // $scope.user = {
  //   firstName: '',
  //   lastName: '',
  //   emailAddress: '',
  //   password: ''
  // };
  //
  // $scope.error = '';

  function userController($scope) {

    // $scope.feedbackUser = function() {
    //   $http({
    //     url: 'http://localhost:3000/compare',
    //     method: 'POST',
    //     data: {
    //       emailAddress: $scope.user.emailAddress,
    //       password: $scope.user.password
    //     }
    //   }).then(response => {
    //     if (response.data) {
    //       var date = new Date();
    //       date.setTime(date.getTime()+((60*1000)*120));
    //       $cookies.put('authToken', response.data, {'expires': date});
    //       $location.path('/profile');
    //     }
    //     // else if (response.data.success) {
    //     //   $cookies.put('test-cookie-defaults', 'worked');
    //     //   $localStorage.firstName = response.data.firstName;
    //     //   $localStorage.lastName = response.data.lastName;
    //     //   $localStorage.emailAddress = response.data.emailAddress;
    //     //   $localStorage.teamName = response.data.teamName;
    //     //   $localStorage.profilePicture = response.data.profilePicture;
    //     //   $mdDialog.hide();
    //     //   $location.path('/profile');
    //     // } else {
    //     //   console.log('That feedback didn\'t work');
    //     // }
    //     console.log(response);
    //   })
    // }

    // $scope.submitUser = function() {
    //   $localStorage.firstName = $scope.user.firstName;
    //   $localStorage.lastName = $scope.user.lastName;
    //   $localStorage.emailAddress = $scope.user.emailAddress;
    //   $mdDialog.hide();
    //   $location.path('/moreinfosingle');
    // }
    //
    // $scope.submitCoach = function() {
    //   $localStorage.firstName = $scope.user.firstName;
    //   $localStorage.lastName = $scope.user.lastName;
    //   $localStorage.emailAddress = $scope.user.emailAddress;
    //   $mdDialog.hide();
    //   $location.path('/moreinfocoach');
    // }

  }
});
