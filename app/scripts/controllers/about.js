'use strict';

/**
 * @ngdoc function
 * @name lifesparqApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the lifesparqApp
 */
angular.module('lifesparqApp')
  .controller('AboutCtrl', function () {
    this.employees = [
      {
        pic: '../../images/nathan.jpg',
        name: 'Nathan',
        info: 'Supreme overlord of web development. Were it not for his brilliant mind and flawless expertise in all things tech, we\'d never survive as a company.'
      },
      {
        pic: 'http://placekitten.com/152/152',
        name: 'Eric',
        info: 'Our fearless leader, carrying us forward into the unknown.'
      },
      {
        pic: 'http://placekitten.com/g/152/152',
        name: 'Breeze',
        info: 'Breeze is a nutritionist extraordinaire. There is nothing that she doesn\'t know about nutrition, and nobody in the entire world who knows more than her.'
      }
    ]
  });
