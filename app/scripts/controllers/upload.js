'use strict';

angular.module('lifesparqApp')
  .controller('uploadCtrl', function ($scope, $http, $localStorage, $location) {

    $scope.videosForUpload = [];

    $scope.addVideoToUpload = function () {
      var video = document.getElementById('uploadVideo').files;
      $scope.videosForUpload.push(video);
    }

    $scope.saveVideo = function () {
      const files = document.getElementById('uploadVideo').files;
      const file = files[0];
      if(!file) {
        console.log('No file found');
        return;
      }
      $scope.getSignedRequest(file);
    }

    $scope.getSignedRequest = function (file) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `https://stormy-springs-94108.herokuapp.com/super/sign-s3?file-name=${file.name}&file-type=${file.type}`);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4) {
          if(xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            $scope.uploadFile(file, response.signedRequest, response.url);
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
