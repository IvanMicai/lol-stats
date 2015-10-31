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
  $scope.summonerName = 'STRYDERJZW';
  $scope.championsMap = championsMapFactory;
  $scope.summonerTab = {
    matches: true,
    champions: false,
    season: false
  };

  //Data Structures
  $scope.summoner = {};
  $scope.matchList = {};
  $scope.matchs = {};
  $scope.summonerSummary = {};
  $scope.summonerChampions = {};


  //UI Functions
  $scope.profileTabSwitch = function(tab){
    $scope.summonerTab = {
      matches: false,
      champions: false,
      season: false
    };

    $scope.summonerTab[tab] = true;
  }

  $scope.setRegion = function(region){
		$scope.regionCode = region;
  }

  $scope.searchSummoner = function(){
    loadSummoner()
  }

  function loadSummoner(){
    summonerService.get({region: $scope.regionCode.toLowerCase(), name: $scope.summonerName},
      function(data) { 
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
      },
      function(err) { console.log('controller', err); }
    );
  }

  function loadMatches(){
      matchService.list({region: $scope.regionCode.toLowerCase(), matchId: $scope.matchList, limit: 20 },
        function(data) { 
          $scope.matches = data; 
        },
        function(err) { console.log('controller', err); }
      );
  };

  function loadSummonerSummary(){
    summonerSummaryService.get({region: $scope.regionCode.toLowerCase(), season: $scope.seasonCode, summonerId: $scope.summoner.summonerId},
      function(data) { 
        $scope.summonerSummary = data; 
      },
      function(err) { console.log('controller', err); }
    );
  }
  function loadSummonerChampions(){
    summonerChampionsService.get({region: $scope.regionCode.toLowerCase(), season: $scope.seasonCode, summonerId: $scope.summoner.summonerId},
      function(data) { 
        $scope.summonerChampions = data; 
      },
      function(err) { console.log('controller', err); }
    );
  }

});
