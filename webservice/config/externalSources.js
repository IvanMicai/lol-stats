/**
 *  External Source Config
 */

module.exports = {
	summonerByName: function(apiKey, region, name){
		return 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v1.4/summoner/by-name/' + name + '?api_key=' + apiKey
	},
	summonerChampionsById: function(apiKey, region, season, name){
		return 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v1.3/stats/by-summoner/' + name + '/ranked?season=' + season + '&api_key=' + apiKey
	},
	summonerSummaryById: function(apiKey, region, season, name){
		return 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v1.3/stats/by-summoner/' + name + '/summary?season=' + season + '&api_key=' + apiKey
	},
	matchById: function(apiKey, region, id){
		return 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v2.2/match/' + id + '?api_key=' + apiKey
	},
	matchListBySummonerId: function(apiKey, region, summonerId){
		return 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v2.2/matchlist/by-summoner/' + summonerId + '?api_key=' + apiKey
	}
}
