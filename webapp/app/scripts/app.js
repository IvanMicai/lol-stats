'use strict';

/**
 * @ngdoc overview
 * @name lolStatsApp
 * @description
 * # lolStatsApp
 *
 * Main module of the application.
 */
angular
  .module('lolStatsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.translate',
    'lolStatsApp.matchService',
    'lolStatsApp.summonerService',
    'lolStatsApp.championsMapFactory',
    'lolStatsApp.matchListService',
    'lolStatsApp.summonerSummaryService',
    'lolStatsApp.summonerChampionsService'
  ])
  .config(function ($routeProvider, $translateProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });

    $translateProvider.useStaticFilesLoader({
      prefix: 'locale/',
      suffix: '.json'
    });

    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escaped');

  });
