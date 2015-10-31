'use strict';

/**
 * @ngdoc function
 * @name lolStatsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lolStatsApp
 */
angular.module('lolStatsApp')
  .controller('MainCtrl', function ($scope, $rootScope, championsMapFactory, summonerService, matchService, matchListService, summonerSummaryService, summonerChampionsService) {

  //Form
  $rootScope.controllerCode = {main: true, compare: false};
  $scope.regionCode = 'NA';
  $scope.seasonCode = 'SEASON2015';
  $scope.summonerName = '';
  $scope.championsMap = championsMapFactory;
  $scope.tagFilterMap = {
    Tank: false,
    Fighter: false,
    Mage: false,
    Marksman: false,
    Assassin: false,
    Support: false
  }

  $scope.summonerTab = {
    rule: true,
    champions: false,
    season: false
  };

  //Data Structures
  $scope.summonerLoaded = 0;
  $scope.summonerError = false;
  $scope.summonerLoadFinish = false;
  $scope.summoner = {};
  $scope.matchList = {};
  $scope.matchs = {};
  $scope.summonerSummary = {};
  $scope.summonerChampions = {};


  //UI Functions
  $scope.profileTabSwitch = function(tab){
    $scope.summonerTab = {
      rule: false,
      champions: false,
      season: false
    };

    $scope.summonerTab[tab] = true;
  }

  $scope.setRegion = function(region){
		$scope.regionCode = region;
  }

  $scope.summonerLoadedCount = function(){
    $scope.summonerLoaded += 1;
    if($scope.summonerLoaded === 3){
      $scope.summonerLoadFinish = true;
    }
  }
  $scope.searchSummoner = function(){
    loadSummoner()
  }

  $scope.tagFilter = function(item){
    if( $scope.tagFilterMap.Tank === false &&
        $scope.tagFilterMap.Fighter === false &&
        $scope.tagFilterMap.Mage === false &&
        $scope.tagFilterMap.Marksman === false &&
        $scope.tagFilterMap.Assassin === false &&
        $scope.tagFilterMap.Support === false ){
      return true
    }

    if($scope.tagFilterMap.Tank){    if( item.tags.indexOf('Tank') !== -1) return true };
    if($scope.tagFilterMap.Fighter){ if( item.tags.indexOf('Fighter') !== -1) return true };
    if($scope.tagFilterMap.Mage){    if( item.tags.indexOf('Mage') !== -1) return true };
    if($scope.tagFilterMap.Marksman){if( item.tags.indexOf('Marksman') !== -1) return true };
    if($scope.tagFilterMap.Assassin){if( item.tags.indexOf('Assassin') !== -1) return true };
    if($scope.tagFilterMap.Support){ if( item.tags.indexOf('Support') !== -1) return true };
  }

  function loadSummoner(){
    summonerService.get({region: $scope.regionCode.toLowerCase(), name: $scope.summonerName},
      function(data) {
        $scope.summonerLoaded = 0;
        $scope.summonerLoadFinish = false;
        $scope.summoner = {};
        $scope.matchList = {};
        $scope.matchs = {};
        $scope.summonerSummary = {};
        $scope.summonerChampions = {};

        $scope.summoner = data;
        loadMatchList();
        loadSummonerSummary();
        loadSummonerChampions();
      },
      function(err) { console.log('controller', err); }
    );
  }

  function loadMatchList(){
    matchListService.get({region: $scope.regionCode.toLowerCase(), summonerId: $scope.summoner.summonerId},
      function(data) {
        $scope.matchList = data;
        $scope.summonerLoadedCount();
      },
      function(err) {  $scope.summonerError = true }
    );
  }

  function loadSummonerSummary(){
    summonerSummaryService.get({region: $scope.regionCode.toLowerCase(), season: $scope.seasonCode, summonerId: $scope.summoner.summonerId},
      function(data) {
        $scope.summonerSummary = data;
        $scope.summonerLoadedCount();
      },
      function(err) { $scope.summonerError = true }
    );
  }
  function loadSummonerChampions(){
    summonerChampionsService.get({region: $scope.regionCode.toLowerCase(), season: $scope.seasonCode, summonerId: $scope.summoner.summonerId},
      function(data) {
        $scope.summonerChampions = data;
        $scope.summonerLoadedCount();
      },
      function(err) { $scope.summonerError = true }
    );
  }

});
