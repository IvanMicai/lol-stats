/**
 *  Summoner Summary Controller
 */

var request = require('request');

module.exports = function (req, res, next) { 
	if(res.dataSource === 'external'){
		var summonerChampions = {
			summonerId: parseInt(req.params.summonerId, 10),
			region: req.query.region, 
			season: req.query.season,
			data: res.data, 
		};

		var total = undefined
		var i

		//Findind and remove Total
		for (i = 0; i < summonerChampions.data.champions.length || total === undefined; i++) {
			if(summonerChampions.data.champions[i].id == "0"){
				console.log('achou')
				total = summonerChampions.data.champions.splice(i, 1)[0];
			}
		};

		for (i = 0; i < summonerChampions.data.champions.length; i++) {
			summonerChampions.data.champions[i].stats.pickRate = (summonerChampions.data.champions[i].stats.totalSessionsPlayed/total.stats.totalSessionsPlayed*100)
		};

		res.data = summonerChampions;
	}

	return next()	
};