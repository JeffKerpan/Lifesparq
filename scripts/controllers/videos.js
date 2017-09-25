'use strict';

angular.module('lifesparqApp')
  .controller('videosCtrl', function ($scope, $http, $cookies) {

    $scope.allTags = [];
    $scope.currentPlaylist = null;
    $scope.tag;
    $scope.response = false;
    $scope.currentVideos;

    function getAllTags() {
      $http.get('http://localhost:3000/sprout/alltags')
      .then(result => {
        console.log('result', result);
        result.data.tags.forEach((tag) => {
          var tagObject = {
            tagName: tag.name,
            tagId: tag.id
          }
          $scope.allTags.push(tagObject);
        })
      })
      .catch(err => {
        console.log(err);
      })
    }

    getAllTags();

    $scope.showVideos = function (playlist) {
      if($('.sproutvideo-playlist')) {
        $('.sproutvideo-playlist').remove();
      }
      if ($scope.currentPlaylist === playlist.id) {
        $scope.currentPlaylist = null;
      } else {
        $(`.${playlist.id}`).append(playlist.embed_code);
        $scope.currentPlaylist = playlist.id;
      }
    }

    $scope.getVideos = function (tag) {
      var token = $cookies.get('Authorization');
      $http.defaults.headers.common.Authorization = `Bearer ${token}`;
      tag = $scope.tag.split(' ').join('+');
      $http({
        url: 'http://localhost:3000/sprout/videosbytag',
        method: 'POST',
        data: {tag: tag}
      })
      .then(response => {
        console.log(response);
        $('.videoBox').empty();
        $scope.response = true;
        $scope.currentVideos = response.data;
        response.data.forEach((video) => {
          if (video.watched) {
            video.title = video.title + ' (Watched)';
          }
          $('.videoBox').append(`<section>
            <h3>${video.title}</h3>
            <div>${video.embed_code}</div>
          </section>`);
        })
      })
    }
});
