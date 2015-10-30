/**
 *  Match List Middleware
 */
var env       = process.env.NODE_ENV || 'development'

var request   = require('request');
var path      = require('../utils/path.js')
var envConfig = require(path.config + '/env')[env]

var matchListModel   = require(path.models + '/matchList')
var externalSources = require(path.config + '/externalSources')
var credentials     = require(path.config + '/credentials')


/**
 *  Internal Loader
 */

module.exports.internal = function (req, res, next) { 
	if(req.query.renew === 'true'){
		return next()
	}

	matchListModel.findOne({ summonerId: parseInt(req.params.summonerId, 10) }, function(err, matchList) {
		if(matchList){
			res.data = matchList
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

	var url = externalSources.matchListBySummonerId(credentials.apiKey, req.query.region, req.params.summonerId)

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

	matchListModel.findOneAndUpdate({ summonerId: parseInt(req.params.summonerId, 10) }, res.data, {new: true, upsert: true}, function (err, matchList) {
		if (err){
			return next()
		}else{
	    	res.data = matchList
		 	return next()
		}
	})

};