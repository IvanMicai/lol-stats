/**
 *  Environments
 */

module.exports = {
	development: {
		mongoUrl: 'mongodb://lol-stats-mongoservice/dev-lol-stats',
		allowedDomains: ['http://localhost:9000', undefined]
	},
	qa: {
		mongoUrl: 'mongodb://localhost/qa-lol-stats',
		allowedDomains: []
	},
	production: {
		mongoUrl: 'mongodb://localhost/prod-lol-stats',
		allowedDomains: []
	}
}
