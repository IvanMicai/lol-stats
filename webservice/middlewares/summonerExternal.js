/**
 *  Summoner Middleware
 */

var request = require('request');
var path = require('../utils/path.js')

var externalSources = require(path.config + '/externalSources')
var credentials = require(path.config + '/credentials')
var summonerModel = require(path.models + '/summoner')

module.exports = function (req, res, next) { 
	if(res.dataSource.summoner === 'internal'){
		return next()
	}

	var url = externalSources.summonerByName(credentials.apiKey, req.query.region, req.params.name)

	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			body = JSON.parse(body)
			res.data.summoner = body[Object.keys(body)];
			res.dataSource.summoner = 'external'
		}else{
			res.data.summoner = undefined;
		}
		return next()
	})
};