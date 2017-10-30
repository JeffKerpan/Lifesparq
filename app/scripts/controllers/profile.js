'use strict';

angular.module('lifesparqApp')
  .controller('profileCtrl', function ($scope, $mdSidenav, $timeout, $log, $localStorage, $cookies, $location, $http) {
    $scope.toggleLeft = buildDelayedToggler('right');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };

    $scope.authenticatedUser = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      teamName: '',
      profilePicture: ''
    }

    function getUserInfo() {
      var token = $cookies.get('Authorization');
      $http.defaults.headers.common.Authorization = `Bearer ${token}`;
      return $http.get('http://localhost:3000/userinfo')
      .then(result => {
        $scope.authenticatedUser = {
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          emailAddress: result.data.emailAddress,
          teamName: result.data.teamName,
          profilePicture: result.data.profilePicture
        }
      })
      .catch(err => {
        console.log(err);
      });
    }

    getUserInfo();

    // $scope.testing = Base64.encode(firstName);
    // console.log($scope.testing);

    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      };
    }

})
  .controller('leftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });

    };
  })
  .controller('rightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
});
