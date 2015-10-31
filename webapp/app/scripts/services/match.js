'use strict';

angular.module( 'lolStatsApp.matchService', [])
.factory('matchService', function($resource) {
  return $resource('http://localhost:3000/match/:matchId', {matchId:'@matchId'}, {
    get:    { method: 'GET',    params: {region:'@region'} },
  });
});