/**
 *  External Source Config
 */

module.exports = {
	summonerByName: function(apiKey, region, name){
		return 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v1.4/summoner/by-name/' + name + '?api_key=' + apiKey
	},
	summonerRankedStatsById: function(apiKey, region, season, name){
		return 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v1.3/stats/by-summoner/' + name + '/ranked?season=' + season + '&api_key=' + apiKey
	},
	summonerSummaryStatsById: function(apiKey, region, season, name){
		return 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v1.3/stats/by-summoner/' + name + '/summary?season=' + season + '&api_key=' + apiKey
	},
	match: function(apiKey, matchId){
		return 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v2.2/match/' + matchId + '?api_key=' + apiKey
	},
	matchListBySummonerId: function(apiKey, summonerId){
		return 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v2.2/matchlist/by-summoner/' + summonerId + '?api_key=' + apiKey
	}
}
