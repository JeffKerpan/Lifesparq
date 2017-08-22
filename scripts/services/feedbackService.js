(function() {
  'use strict';

  angular.module('lifesparqApp')
    .service('feedbackService', function($http, $window) {

      const feedbackUrl = 'http://localhost:3000/';

      this.sendFeed = (feedback) => {
        if (feedback.name && feedback.message) {
          return $http.post(feedbackUrl + 'feedback', JSON.stringify(feedback))
          .then(feedResponse => {
            console.log(feedResponse, 'service');
          })
          .catch(err => {
            console.log(err);
          });
        } else {
          console.log('incomplete');
        }
      };
    }
  );

}());
