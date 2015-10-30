var path = require('./utils/path.js')

//Requires
var initializeMiddleware = require(path.middlewares + '/initialize')

var summonerMiddleware = require(path.middlewares + '/summoner')
var matchListMiddleware = require(path.middlewares + '/matchList')

//var matchesMiddleware = require(path.middlewares + '/matches')
//var matchlistMiddleware = require(path.middlewares + '/matchlist')

var summonerController = require(path.controllers + '/summoner')
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
}