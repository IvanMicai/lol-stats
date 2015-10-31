/**
 *  Summoner Summary Controller
 */

var request = require('request');
var path      = require('../utils/path.js')
var libChampions = require(path.lib + '/champions')

module.exports = function (req, res, next) {
	if(res.dataSource === 'external'){
		var summonerChampions = {
			summonerId: parseInt(req.params.summonerId, 10),
			region: req.query.region,
			season: req.query.season,
			data: res.data,
		};

    summonerChampions.rules = libChampions.rules(summonerChampions)
    summonerChampions.total = libChampions.pickRate(summonerChampions)
    summonerChampions.data.champions = libChampions.addTags(summonerChampions)

		res.data = summonerChampions;
	}

	return next()
};
