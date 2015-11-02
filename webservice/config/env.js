/**
 *  Environments
 */

module.exports = {
	development: {
		mongoUrl: 'mongodb://lol-stats-mongoservice/dev-lol-stats',
		allowedDomains: ['http://localhost:9000', undefined]
	},
	qa: {
		mongoUrl: 'mongodb://lol-stats-mongoservice/qa-lol-stats',
		allowedDomains: ['http://qa.lol-stats.com']
	},
	production: {
		mongoUrl: 'mongodb://lol-stats-mongoservice/prod-lol-stats',
		allowedDomains: ['http://lol-stats.com']
	}
}
