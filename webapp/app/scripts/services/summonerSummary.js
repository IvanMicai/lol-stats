'use strict';

angular.module( 'lolStatsApp.summonerSummaryService', [])

.factory('summonerSummaryService', function($resource) {
  return $resource('http://localhost:3000/summoner-summary/:summonerId', {summonerId:'@summonerId'}, {
    get:    { method: 'GET',    params: {region:'@region', season: '@season'} },
  });
});
