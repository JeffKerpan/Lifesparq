'use strict';

angular.module('lifesparqApp')
  .controller('signUpCtrl', function ($scope, $mdSidenav, $timeout, $log, $localStorage, $http) {
    $scope.firstName = $localStorage.firstName;
    $scope.lastName = $localStorage.lastName;
    $scope.emailAddress = $localStorage.emailAddress;

    $scope.showUpload = false;
    $scope.manualEntry = false;

    $scope.coachAndTeam = {
      teamName: '',
      sport: '',
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      emailAddress: $scope.emailAddress,
      password: '',
      teamId: 0
    }

    $scope.fullTeam = [];

    $scope.teamMember = {
      firstName: '',
      lastName: '',
      emailAddress: ''
    }

    $scope.addTeamMember = function() {
      var newMember = {
        firstName: $scope.teamMember.firstName,
        lastName: $scope.teamMember.lastName,
        emailAddress: $scope.teamMember.emailAddress
      }
      $scope.fullTeam.push(newMember);
      $scope.teamMember.firstName = '';
      $scope.teamMember.lastName = '';
      $scope.teamMember.emailAddress = '';
    }

    $scope.submitCoach = function(data) {
      $localStorage.$reset();
      // $scope.sendSignUpEmails($scope.fullTeam);
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
            teamId: $scope.coachAndTeam.teamId,
            file: data
          }
        }).then(response => {
          console.log(response);
        })
      })

    }

    //access-control-allow-origin error, cannot access from local host.
    $scope.sendSignUpEmails = function (teamArray) {
      console.log(teamArray);
      teamArray.forEach((member) => {
        console.log(member);
        $http({
          url: 'https://api.mailgun.net/v3/sandboxa61564483d514e1294fe7186a33ea09d.mailgun.org/messages',
          method: 'POST',
          data: {
            api: 'key-66411c98e08459dd66618740f49845b9',
            from: 'Mailgun Sandbox <postmaster@sandboxa61564483d514e1294fe7186a33ea09d.mailgun.org>',
            to: member.emailAddress,
            subject: `Welcome, ${member.firstName}`,
            text: `Hey ${member.firstName}, your coach submitted your name to sign up for Lifesparq!`
          }
        })
      })
    }

    $scope.showForm = function (whichForm) {
      if (whichForm === 'manualEntry') {
        $scope.manualEntry = true;
        $scope.showUpload = false;
      } else {
        $scope.showUpload = true;
        $scope.manualEntry = false;
      }

    }

    $scope.add = function() {
      if (document.getElementById('file') === null) {
        $scope.submitCoach();
      } else {
        var f = document.getElementById('file').files[0],
        r = new FileReader();

        r.onloadend = function(e) {
          var data = e.target.result;

          $scope.submitCoach(data);
        }


        r.readAsBinaryString(f);
      }
}

$scope.test = function () {
  console.log($scope.coachAndTeam);
}
  });
