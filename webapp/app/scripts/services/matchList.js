'use strict';

angular.module( 'lolStatsApp.matchListService', [])

.factory('matchListService', function($resource) {
  return $resource('http://localhost:3000/match-list/:summonerId', {summonerId:'@summonerId'}, {
    get:    { method: 'GET',    params: {region:'@region'} },
  });
});
