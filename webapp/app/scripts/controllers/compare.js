'use strict';

/**
 * @ngdoc function
 * @name lolStatsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the lolStatsApp
 */
angular.module('lolStatsApp')
  .controller('CompareCtrl', function ($scope, $rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $rootScope.controllerCode = {main: false, compare: true};
  });
