'use strict';

angular.module('lifesparqApp')
  .controller('signUpUserCtrl', function ($scope, $log, $localStorage, $http) {
    $scope.firstName = $localStorage.firstName;
    $scope.lastName = $localStorage.lastName;
    $scope.emailAddress = $localStorage.emailAddress;

    $scope.user = {
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      emailAddress: $scope.emailAddress,
      password: '',
      sport: ''
    }

    $scope.secondPassword = '';

    $scope.passwordError = '';


    $scope.validatePasswords = function () {
      var firstPassword = $scope.user.password;
      var secondPassword = $scope.secondPassword;

      if (firstPassword.length && secondPassword.length) {
        if (firstPassword !== secondPassword) {
          $scope.passwordError = 'Passwords must match';
        } else {
          $scope.passwordError = '';
        }
      }
    }

    $scope.submitUser = function(profilePicture) {
      $localStorage.$reset();

      $http({
        url: 'http://localhost:3000/newuser',
        method: 'POST',
        data: {
          tableName: 'users',
          firstName: $scope.user.firstName,
          lastName: $scope.user.lastName,
          password: $scope.user.password,
          emailAddress: $scope.user.emailAddress,
          sport: $scope.user.sport,
          profilePicture: profilePicture || ''
        }
      }).then(response => {
        console.log(response);
      })
    }

    $scope.saveImage = function () {
      const files = document.getElementById('picture-input').files;
      const file = files[0];
      if(!file) {
        $scope.submitUser();
        return;
      }
      $scope.getSignedRequest(file);
    }

    $scope.getSignedRequest = function (file) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `http://localhost:3000/sign-s3?file-name=${file.name}&file-type=${file.type}`);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4) {
          if(xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            $scope.uploadFile(file, response.signedRequest, response.url);
            $scope.submitUser(response.url);
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
