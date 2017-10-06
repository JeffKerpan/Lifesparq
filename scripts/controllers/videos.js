'use strict';

angular.module('lifesparqApp')
  .controller('videosCtrl', function ($scope, $http, $cookies) {

    $scope.allPlaylists = [];
    $scope.currentPlaylist = null;
    $scope.playlist;
    $scope.response = false;
    $scope.currentVideos;

    function getAllPlaylists() {
      $http.get('http://localhost:3000/sprout/allplaylists')
      .then(result => {
        result.data.playlists.forEach((playlist) => {
          var playlistObject = {
            playlistName: playlist.title,
            playlistId: playlist.id,
            embedCode: playlist.embed_code
          }
          $scope.allPlaylists.push(playlistObject);
        })
        console.log($scope.allPlaylists);
      })
      .catch(err => {
        console.log(err);
      })
    }

    getAllPlaylists();

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

    $scope.displayVideos = function () {
      var name = $('.playlists').val();
      $scope.allPlaylists.forEach((playlist) => {
        if (playlist.playlistName === name) {
          $('.videoBox').empty();
          $('.videoBox').append(`<section ng-click="addToWatched(playlist.id)">
            <h3>${name}</h3>
            <div">${playlist.embedCode}</div>
          </section>`);
        }
      })
    }

    $scope.addToWatched = function (id) {
      console.log(id);
    }
});
