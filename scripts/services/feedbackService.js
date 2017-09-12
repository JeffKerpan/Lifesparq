(function() {
  'use strict';

  angular.module('lifesparqApp')
    .service('feedbackService', function($http, $window, $cookies) {

      const feedbackUrl = 'https://stormy-springs-94108.herokuapp.com/';
      const devfeedbackUrl = 'http://localhost:3000/';

      this.sendFeed = (feedback) => {
        if (feedback.name && feedback.message) {
          var token = $cookies.get('Authorization');
          $http.defaults.headers.common.Authorization = `Bearer ${token}`;
          return $http.post(devfeedbackUrl + 'feedback',
          {
            name: feedback.name,
            message: feedback.message
          })
          // .then(feedResponse => {
          //   console.log(feedResponse, 'service');
          // })
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
