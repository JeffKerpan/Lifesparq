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
        pic: 'http://lorempixel.com/152/152/sports/3',
        name: 'Eric',
        info: 'Our fearless leader, carrying us forward into the unknown.'
      },
      {
        pic: 'http://lorempixel.com/152/152/sports/5',
        name: 'Breeze',
        info: 'Breeze is a dietician extraordinaire. There is nothing that she doesn\'t know about nutrition, and nobody in the entire world who knows more than her.'
      },
      {
        pic: 'http://lorempixel.com/152/152/sports/1',
        name: 'Mark',
        info: 'Mark has potential, probably.'
      }
    ]
  });
