'use strict';

angular.module('lifesparqApp')
  .controller('signUpTeamMemberCtrl', function ($scope, $log, $localStorage, $http, $cookies, $location, $routeParams) {
    $scope.url = $location.path().split('/');
    $scope.teamId = $routeParams.teamId;

    $scope.user = {
      teamName: '',
      teamId: $scope.teamId,
      firstName: $routeParams.firstName,
      lastName: $routeParams.lastName,
      emailAddress: '',
      profilePicture: '',
      password: '',
      birthday: ''
    }

    $scope.getTeamName = function() {
      $http({
        url: `http://localhost:3000/teamname`,
        method: 'POST',
        data: {teamId: $scope.teamId}
      }).then(result => {
        $scope.user.teamName = result.data[0].teamName;
      }).catch(err => {
        console.log(err);
      })
    }

    $scope.getTeamName();

    $scope.submitUser = function() {
      $http({
        url: 'http://localhost:3000/newuser',
        method: 'POST',
        data: {
          tableName: 'users',
          teamId: $scope.user.teamId,
          firstName: $scope.user.firstName,
          lastName: $scope.user.lastName,
          emailAddress: $scope.user.emailAddress,
          profilePicture: $scope.user.profilePicture,
          password: $scope.user.password,
          birthday: $scope.user.birthday
        }
      }).then(result => {
        var date = new Date();
        date.setTime(date.getTime()+((60*1000)*120));
        $cookies.put('Authorization', result.data.token, {'expires': date});
        $location.path('/profile');
      })
    }

  })
