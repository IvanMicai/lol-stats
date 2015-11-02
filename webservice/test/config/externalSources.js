var expect = require('expect');

var path      = require('../../utils/path.js')
var externalSources = require(path.config + '/externalSources')

var apiKey = 'xxxxxx',
    matchId = '123456',
    summonerId = '123456',
    region = 'na',
    name = 'summoner',
    season = '2015'

describe('Config: External Source', function() {

  it('should return summonerByName URL', function () {
    expect(externalSources.summonerByName(apiKey, region, name))
    .toEqual('https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/summoner?api_key=xxxxxx')
  });

  it('should return summonerChampionsById URL', function () {
    expect(externalSources.summonerChampionsById(apiKey, region, season, name))
    .toEqual('https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/summoner/ranked?season=2015&api_key=xxxxxx')
  });

  it('should return summonerSummaryById URL', function () {
    expect(externalSources.summonerSummaryById(apiKey, region, season, name))
    .toEqual('https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/summoner/summary?season=2015&api_key=xxxxxx')
  });

  it('should return matchById URL', function () {
    expect(externalSources.matchById(apiKey, region, matchId))
    .toEqual('https://na.api.pvp.net/api/lol/na/v2.2/match/123456?api_key=xxxxxx')
  });

  it('should return matchListBySummonerId URL', function () {
    expect(externalSources.matchListBySummonerId(apiKey, region, summonerId))
    .toEqual('https://na.api.pvp.net/api/lol/na/v2.2/matchlist/by-summoner/123456?api_key=xxxxxx')
  });
});
