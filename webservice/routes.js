var path = require('./utils/path.js')

//Requires
var initializeMiddleware = require(path.middlewares + '/initialize')

var summonerMiddleware = require(path.middlewares + '/summoner')


//var matchesMiddleware = require(path.middlewares + '/matches')
//var matchlistMiddleware = require(path.middlewares + '/matchlist')

var summonerController = require(path.controllers + '/summoner')
var responseHandlerController = require(path.controllers + '/responseHandler')

//Routes
module.exports = function (app) {
  app.get( '/summoner/:name', 
  	initializeMiddleware, 
    summonerMiddleware.internal,
    summonerMiddleware.external,
  	/*matchesMiddleware,*/ 
  	/*matchlistMiddleware,*/ 
  	summonerController,
    summonerMiddleware.save,
  	responseHandlerController
  );
}