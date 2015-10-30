var path = require('./utils/path.js')

//Requires
var initializeMiddleware = require(path.middlewares + '/initialize')

var summonerMiddleware = require(path.middlewares + '/summoner')
var summonerSummaryMiddleware = require(path.middlewares + '/summonerSummary')
var summonerChampionsMiddleware = require(path.middlewares + '/summonerChampions')
var matchMiddleware = require(path.middlewares + '/match')
var matchListMiddleware = require(path.middlewares + '/matchList')

//var matchesMiddleware = require(path.middlewares + '/matches')
//var matchlistMiddleware = require(path.middlewares + '/matchlist')

var summonerController = require(path.controllers + '/summoner')
var summonerSummaryController = require(path.controllers + '/summonerSummary')
var summonerChampionsController = require(path.controllers + '/summonerChampions')
var matchController = require(path.controllers + '/match')
var matchListController = require(path.controllers + '/matchList')
var responseHandlerController = require(path.controllers + '/responseHandler')

//Routes
module.exports = function (app) {
  app.get( '/summoner/:name', 
  	initializeMiddleware, 
    summonerMiddleware.internal,
    summonerMiddleware.external,
  	summonerController,
    summonerMiddleware.save,
  	responseHandlerController
  );

  app.get( '/match-list/:summonerId', 
    initializeMiddleware, 
    matchListMiddleware.internal,
    matchListMiddleware.external,
    matchListController,
    matchListMiddleware.save,
    responseHandlerController
  );

  app.get( '/match/:matchId', 
    initializeMiddleware, 
    matchMiddleware.internal,
    matchMiddleware.external,
    matchController,
    matchMiddleware.save,
    responseHandlerController
  );

  app.get( '/summoner-summary/:summonerId', 
    initializeMiddleware, 
    summonerSummaryMiddleware.internal,
    summonerSummaryMiddleware.external,
    summonerSummaryController,
    summonerSummaryMiddleware.save,
    responseHandlerController
  );

  app.get( '/summoner-champions/:summonerId', 
    initializeMiddleware, 
    summonerChampionsMiddleware.internal,
    summonerChampionsMiddleware.external,
    summonerChampionsController,
    summonerChampionsMiddleware.save,
    responseHandlerController
  );
}