'use strict';

angular.module( 'lolStatsApp.summonerService', [])

.factory('summonerService', function($resource) {
  return $resource('http://localhost:3000/summoner/:name', {name:'@name'}, {
    get:    { method: 'GET',    params: {region:'@region'} },
  });
});
