/**
 *  Match Middleware
 */
var env       = process.env.NODE_ENV || 'development'

var request   = require('request');
var path      = require('../utils/path.js')
var envConfig = require(path.config + '/env')[env]

var matchModel   = require(path.models + '/match')
var externalSources = require(path.config + '/externalSources')
var credentials     = require(path.config + '/credentials')


/**
 *  Internal Loader
 */

module.exports.internal = function (req, res, next) { 
	if(req.query.renew === 'true'){
		return next()
	}

	matchModel.findOne({ matchId: parseInt(req.params.matchId, 10) }, function(err, match) {
		if(match){
			res.data = match
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

	var url = externalSources.matchById(credentials.apiKey, req.query.region, req.params.matchId)

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
 *  Save
 */

module.exports.save = function (req, res, next) { 
	if(res.dataSource === 'internal'){
		return next()
	}

	matchModel.findOneAndUpdate({ matchId: parseInt(req.params.matchId, 10) }, res.data, {new: true, upsert: true}, function (err, match) {
		if (err){
			return next()
		}else{
	    	res.data = match
		 	return next()
		}
	})

};