'use strict';

angular.module('lifesparqApp')
  .controller('signUpCoachCtrl', function ($scope, $log, $localStorage, $http) {
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
    $scope.profilePictureUrl = '';
    $scope.spreadsheetFile = '';

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

    $scope.submitCoach = function(teamList, profilePicture) {
      $localStorage.$reset();
      // $scope.sendSignUpEmails($scope.fullTeam);
      $http({
        url: 'https://stormy-springs-94108.herokuapp.com/newteam',
        method: 'POST',
        data: {
          teamName: $scope.coachAndTeam.teamName,
          sport: $scope.coachAndTeam.sport
        }
      }).then( response => {
        $scope.coachAndTeam.teamId = response.data.id;
        $http({
          url: 'https://stormy-springs-94108.herokuapp.com/newuser',
          method: 'POST',
          data: {
            tableName: 'coaches',
            firstName: $scope.coachAndTeam.firstName,
            lastName: $scope.coachAndTeam.lastName,
            emailAddress: $scope.coachAndTeam.emailAddress,
            password: $scope.coachAndTeam.password,
            teamId: $scope.coachAndTeam.teamId,
            file: teamList,
            profilePicture: profilePicture
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
            api: PROCESS.ENV.MAILGUNKEY,
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
      console.log('add');
      if (document.getElementById('file') === null) {
        $scope.saveImage();
      } else {
        var f = document.getElementById('file').files[0],
        r = new FileReader();

        r.onloadend = function(e) {
          var data = e.target.result;

          $scope.spreadsheetFile = data;
          $scope.saveImage();
        }


        r.readAsBinaryString(f);
      }
    }

  $scope.sendArrayOrFile = function () {
    console.log('pic', $scope.profilePictureUrl);
    if ($scope.fullTeam.length) {
      $scope.submitCoach($scope.fullTeam, $scope.profilePictureUrl);
    } else {
      $scope.submitCoach($scope.spreadsheetFile, $scope.profilePictureUrl);
    }
  }

  //The next 3 functions exist to upload items to AWS.
  //This shit only works for posting a picture, need to learn how to remove one.

  $scope.saveImage = function () {
    const files = document.getElementById('picture-input').files;
    const file = files[0];
    if(!file) {
      $scope.sendArrayOrFile();
      return;
    }
    $scope.getSignedRequest(file);
  }

  $scope.getSignedRequest = function (file) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://stormy-springs-94108.herokuapp.com/sign-s3?file-name=${file.name}&file-type=${file.type}`);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4) {
        if(xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          $scope.uploadFile(file, response.signedRequest, response.url);
          $scope.profilePictureUrl = response.url;
          $scope.sendArrayOrFile();
        }
        else {
          alert('Could not get signed URL.');
        }
      }
    };
    xhr.send();
  }

  $scope.uploadFile = function (file, signedRequest, url) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4) {
        if(xhr.status === 200) {
          document.getElementById('preview').src = url;
          document.getElementById('avatar-url').value = url;
        }
        else {
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(file);
  }

  });
