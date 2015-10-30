/**
 *  Summoner Champions Middleware
 */
var env       = process.env.NODE_ENV || 'development'

var request   = require('request');
var path      = require('../utils/path.js')
var envConfig = require(path.config + '/env')[env]

var summonerChampionsModel = require(path.models + '/summonerChampions')
var externalSources        = require(path.config + '/externalSources')
var credentials            = require(path.config + '/credentials')


/**
 *  Internal Loader
 */

module.exports.internal = function (req, res, next) { 
	if(req.query.renew === 'true'){
		return next()
	}
	
	summonerChampionsModel.findOne({ summonerId: parseInt(req.params.summonerId, 10), region: req.query.region, season: req.query.season }, function(err, summonerChampions) {
		if(summonerChampions){
			res.data = summonerChampions
			res.dataSource = 'internal'
			return next()
		}else{
			return next()
		}
    });
    
}

/**
 *  External Loader
 */

module.exports.external = function (req, res, next) { 
	if(res.dataSource === 'internal'){
		return next()
	}

	var url = externalSources.summonerChampionsById(credentials.apiKey, req.query.region, req.query.season, req.params.summonerId)

	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.data = JSON.parse(body);
			res.dataSource = 'external'
		}else{
			res.data = undefined;
		}
		return next()
	})
};


/**
 *  Summoner Save
 */

module.exports.save = function (req, res, next) { 
	if(res.dataSource === 'internal'){
		return next()
	}
	summonerChampionsModel.findOneAndUpdate({ summonerId: parseInt(req.params.summonerId, 10), region: req.query.region, season: req.query.season}, res.data, {new: true, upsert: true}, function (err, summonerChampions) {
		if (err){
			return next()
		}else{
	    	res.data = summonerChampions
		 	return next()
		}
	})

};