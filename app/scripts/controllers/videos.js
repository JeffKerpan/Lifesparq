'use strict';

angular.module('lifesparqApp')
  .controller('videosCtrl', function ($scope, $http) {

    $scope.allPlaylists = [];
    $scope.currentPlaylist = null;

    function getAllVideos() {
      $http.get('http://localhost:3000/testsprout')
      .then(result => {
        $scope.allPlaylists = result.data.playlists;
      })
      .catch(err => {
        console.log(err);
      })
    }

    getAllVideos();

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
});
