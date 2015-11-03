'use strict';

/**
 * @ngdoc function
 * @name lolStatsApp.controller:TranslateCtrl
 * @description
 * # TranslateCtrl
 * Controller of the lolStatsApp
 */
angular.module('lolStatsApp')
  .controller('TranslateCtrl', function ($scope, $translate) {

    $scope.changeLanguage = function (key) {
      $translate.use(key);
    };
});
