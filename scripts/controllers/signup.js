'use strict';

angular.module('lifesparqApp')
  .controller('signUpCtrl', function ($scope, $mdSidenav, $timeout, $log, $localStorage, $http) {
    $scope.firstName = $localStorage.firstName;
    $scope.lastName = $localStorage.lastName;
    $scope.emailAddress = $localStorage.emailAddress;

    $scope.coachAndTeam = {
      teamName: '',
      sport: '',
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      emailAddress: $scope.emailAddress,
      password: '',
      teamId: 0
    }

    $scope.submitCoach = function() {
      $localStorage.$reset();
      $http({
        url: 'http://localhost:3000/newTeam',
        method: 'POST',
        data: {
          teamName: $scope.coachAndTeam.teamName,
          sport: $scope.coachAndTeam.sport
        }
      }).then( response => {
        $scope.coachAndTeam.teamId = response.data.id;
        $http({
          url: 'http://localhost:3000/newCoach',
          method: 'POST',
          data: {
            firstName: $scope.coachAndTeam.firstName,
            lastName: $scope.coachAndTeam.lastName,
            emailAddress: $scope.coachAndTeam.emailAddress,
            password: $scope.coachAndTeam.password,
            teamId: $scope.coachAndTeam.teamId
          }
        }).then(response => {
          console.log(response);
        })
      })

    }
  });
