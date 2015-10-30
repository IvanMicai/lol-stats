var path = require('./utils/path.js')

//Requires
var initializeMiddleware = require(path.middlewares + '/initialize')
var summonerInternalMiddleware = require(path.middlewares + '/summonerInternal')

var summonerExternalMiddleware = require(path.middlewares + '/summonerExternal')

var summonerSaveMiddleware = require(path.middlewares + '/summonerSave')

//var matchesMiddleware = require(path.middlewares + '/matches')
//var matchlistMiddleware = require(path.middlewares + '/matchlist')

var summonerController = require(path.controllers + '/summoner')

//Routes
module.exports = function (app) {
  app.get( '/summoner/:name', 
  	initializeMiddleware, 
  	summonerInternalMiddleware, 
  	summonerExternalMiddleware, 
  	summonerSaveMiddleware, 
  	/*matchesMiddleware,*/ 
  	/*matchlistMiddleware,*/ 
  	summonerController
  );
}