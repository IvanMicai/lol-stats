/**
 *  Summoner Summary Controller
 */

var request = require('request');

module.exports = function (req, res, next) { 
	if(res.dataSource === 'external'){
		var summonerSummary = {
			summonerId: parseInt(req.params.summonerId, 10),
			region: req.query.region, 
			season: req.query.season,
			data: res.data, 
		};
		
		res.data = summonerSummary;
	}

	return next()	
};