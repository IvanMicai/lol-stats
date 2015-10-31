'use strict';

angular.module( 'lolStatsApp.summonerChampionsService', [])

.factory('summonerChampionsService', function($resource) {
  return $resource('http://localhost:3000/summoner-champions/:summonerId', {summonerId:'@summonerId'}, {
    get:    { method: 'GET',    params: {region:'@region', season: '@season'} },
  });
});
