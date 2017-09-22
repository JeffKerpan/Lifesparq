'use strict';

angular.module('lifesparqApp')
  .controller('videosCtrl', function ($scope, $http) {

    $scope.allTags = [];
    $scope.currentPlaylist = null;
    $scope.tag;
    $scope.response = false;

    function getAllTags() {
      $http.get('http://localhost:3000/sprout/alltags')
      .then(result => {
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
      tag = $scope.tag.split(' ').join('+');
      $http({
        url: 'http://localhost:3000/sprout/videosbytag',
        method: 'POST',
        data: {tag: tag}
      })
      .then(response => {
        $('.videoBox').empty();
        $scope.response = true;
        response.data.videos.forEach((video) => {
          console.log(video.embed_code);
          $('.videoBox').append(video.embed_code);
        })
      })
    }
});
