(function() {
  'use strict';

  angular.module('lifesparqApp')
    .service('paymentService', function($http, $window, $cookies) {

      var paymentUrl = '';
      var devpaymentUrl = 'http://localhost:3000/';

// It's safe to expose these
      var testKey = 'pk_test_omrxkYlMQABr18LqgCu4SefL';
      var prodKey = '';

      var stripe = Stripe(testKey);
      var elements = stripe.elements();

      var style;
      var card;

      this.createStripeForm = () => {
        style = {
          base: {
            color: '#2F51FC',
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

      this.authenticatedUser = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        teamName: '',
        profilePicture: ''
      }

      this.getUserInfo = () => {
        var token = $cookies.get('Authorization');
        $http.defaults.headers.common.Authorization = `Bearer ${token}`;
        return $http.get('https://stormy-springs-94108.herokuapp.com/userinfo')
        .then(result => {
          this.authenticatedUser = {
            firstName: result.data.firstName,
            lastName: result.data.lastName,
            emailAddress: result.data.emailAddress,
            teamName: result.data.teamName,
            profilePicture: result.data.profilePicture
          }
          console.log(this.authenticatedUser);
          return result;
        })
        .catch(err => {
          console.log(err);
        });
      }

      this.getUserInfo();

      function stripeTokenHandler(token) {
        if (token.object === "token") {
          var amount = parseInt(document.getElementById('amount').value);
          var numPeople = parseInt(document.getElementById('numPeople').value);
          var authToken = $cookies.get('Authorization');
          $http.defaults.headers.common.Authorization = `Bearer ${authToken}`;
          return $http.post(devpaymentUrl + 'payment/payment', {
            stripeToken: token,
            total: amount * numPeople
          })
          .then( payResponse => {
              console.log(payResponse, 'service payed');
          })
          .catch( err => {
            console.log(err, 'service error');
          })
        }
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
