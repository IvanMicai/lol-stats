var expect = require('expect');

var path      = require('../../utils/path.js')
var envConfig = require(path.config + '/env')

describe('Config: Env', function() {
  it('should MongoUrl is present in all env', function () {
    expect(envConfig.development.mongoUrl).toEqual('mongodb://lol-stats-mongoservice/dev-lol-stats')
    expect(envConfig.qa.mongoUrl).toEqual('mongodb://lol-stats-mongoservice/qa-lol-stats')
    expect(envConfig.production.mongoUrl).toEqual('mongodb://lol-stats-mongoservice/prod-lol-stats')
  });

  it('should allowedDomains is present in all env', function () {
    expect(envConfig.development.allowedDomains).toEqual(['http://localhost:9000', undefined])
    expect(envConfig.qa.allowedDomains).toEqual(['http://qa.lol-stats.com'])
    expect(envConfig.production.allowedDomains).toEqual(['http://lol-stats.com'])
  });
});
