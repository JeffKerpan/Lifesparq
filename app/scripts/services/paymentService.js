(function() {
  'use strict';

  angular.module('lifesparqApp')
    .service('paymentService', function($http, $window, $cookies) {

      var testKey = 'pk_test_jMkpcoWvYd8X52zgFStrIriZ';
      var prodKey = '';

      var stripe = Stripe(testKey);
      var elements = stripe.elements();

      var style;
      var card;

      this.createStripeForm = () => {
        style = {
          base: {
            // color: '#32325d',
            color: 'blue',
            lineHeight: '24px',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
              color: '#aab7c4'
            }
          },
          invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
          }
        };
        card = elements.create('card', {style: style});

      }

      this.createStripeForm();

      this.loadStripeForm = () => {
        card.mount('#card-element');
        card.addEventListener('change', function(event) {
          var displayError = document.getElementById('card-errors');
          if (event.error) {
            displayError.textContent = event.error.message;
          } else {
            displayError.textContent = '';
          }
        });

        // Handle form submission
        var form = document.getElementById('payment-form');
        form.addEventListener('submit', function(event) {
          event.preventDefault();

          stripe.createToken(card).then(function(result) {
            if (result.error) {
              // Inform the user if there was an error
              var errorElement = document.getElementById('card-errors');
              errorElement.textContent = result.error.message;
            } else {
              // Send the token to your server
              stripeTokenHandler(result.token);
            }
          });
        });
      }

      // const feedbackUrl = 'https://stormy-springs-94108.herokuapp.com/';
      //
      // this.sendFeed = (feedback) => {
      //   if (feedback.name && feedback.message) {
      //     var token = $cookies.get('Authorization');
      //     $http.defaults.headers.common.Authorization = `Bearer ${token}`;
      //     return $http.post(feedbackUrl + 'feedback',
      //     {
      //       name: feedback.name,
      //       message: feedback.message
      //     })
      //     // .then(feedResponse => {
      //     //   console.log(feedResponse, 'service');
      //     // })
      //     .catch(err => {
      //       console.log(err);
      //     });
      //   } else {
      //     console.log('incomplete');
      //   }
      // };
    }
  );

}());
