/**
 *  Summoner Middleware
 */

var request = require('request');
var path = require('../utils/path.js')
var summonerModel = require(path.models + '/summoner')

module.exports = function (req, res, next) { 
	console.log('----SummonerInternal---')
	if(req.query.renew === 'true'){
		return next()
	}

	summonerModel.findOne({ nameLowercase: req.params.name.toLowerCase() }, function(err, summoner) {
		if(summoner){
			res.data.summoner = summoner
			res.dataSource.summoner = 'internal'
			return next()
		}else{
			return next()
		}
    });
    
};