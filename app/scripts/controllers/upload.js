'use strict';

angular.module('lifesparqApp')
  .controller('uploadCtrl', function ($scope, $http, $localStorage, $location, $cookies) {

    $scope.allVideos = [];
    $scope.next;
    $scope.nextUrl;
    $scope.previousUrl;
    $scope.showUploadInput = false;
    $scope.currentTitle = '';
    $scope.videoDescription = '';
    $scope.file;
    $scope.form;
    $scope.selectedVideo;
    const token = $cookies.get('Authorization');

    $scope.verifyAccess = function () {
      $http.defaults.headers.common.Authorization = `Bearer ${token}`;
      return $http({
        url: 'http://localhost:3000/super/verify',
        method: 'POST'
      })
      .then(result => {
        if (result.data === true) {
          console.log('true');
          $scope.getAllVideos();
        } else {
          $location.path('/');
        }
      })
      .catch(err => {
        console.log(err);
        $location.path('/');
      });
    }

    $scope.verifyAccess();

    $scope.getAllVideos = function(url) {
      let getUrl = '';
      if (url) {
        getUrl = 'customvideos';
        $http.defaults.headers.common.path = url;
      } else {
        getUrl = 'allvideos';
      }

      $http.defaults.headers.common.Authorization = `Bearer ${token}`;

      $http.get(`http://localhost:3000/sprout/${getUrl}`)
        .then(result => {
          console.log(result);
          if (result.data.next_page) {
            $scope.next = true;
            $scope.nextUrl = result.data.next_page.split('/')[4];
            console.log($scope.nextUrl);
          } else {
            $scope.next = false;
          }
          if (result.data.previous_page) {
            $scope.previous = true;
            $scope.previousUrl = result.data.previous_page.split('/')[4];
          } else {
            $scope.previous = false;
          }
          $scope.allVideos = result.data.videos;
        }).catch(err => {
          console.log(err);
        })
    }

    $scope.showUpload = function(video) {
      $scope.selectedVideo = video;
      $scope.showUploadInput = true;
      $scope.currentTitle = video.title;
    }

    $scope.postFile = function() {
      $scope.file = document.getElementById('file').files[0];
      $scope.videoDescription = document.getElementById('videoDescription').value;
      $scope.form = new FormData($scope.file);
      $http({
        url: 'http://localhost:3000/cloudinary',
        method: 'POST',
        data: {
          video: $scope.selectedVideo,
          videoDescription: $scope.videoDescription
        }
      }).then(response => {
        console.log(response);
      }).catch(err => {
        console.log(err);
      })
    }

  });
