/**
 *  Summoner Summary Middleware
 */
var env       = process.env.NODE_ENV || 'development'

var request   = require('request');
var path      = require('../utils/path.js')
var envConfig = require(path.config + '/env')[env]

var summonerSummaryModel   = require(path.models + '/summonerSummary')
var externalSources        = require(path.config + '/externalSources')
var credentials            = require(path.config + '/credentials')


/**
 *  Internal Loader
 */

module.exports.internal = function (req, res, next) { 
	if(req.query.renew === 'true'){
		return next()
	}
	console.log({ summonerId: parseInt(req.params.summonerId, 10), region: req.query.region, season: req.query.season })
	summonerSummaryModel.findOne({ summonerId: parseInt(req.params.summonerId, 10), region: req.query.region, season: req.query.season }, function(err, summonerSummary) {
		if(summonerSummary){
			res.data = summonerSummary
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

	var url = externalSources.summonerSummaryById(credentials.apiKey, req.query.region, req.query.season, req.params.summonerId)

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
	summonerSummaryModel.findOneAndUpdate({ summonerId: parseInt(req.params.summonerId, 10), region: req.query.region, season: req.query.season}, res.data, {new: true, upsert: true}, function (err, summonerSummary) {
		if (err){
			return next()
		}else{
	    	res.data = summonerSummary
		 	return next()
		}
	})

};