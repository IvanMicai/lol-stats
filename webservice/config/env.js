/**
 *  Environments
 */

module.exports = {
	development: {
		mongoUrl: 'mongodb://lol-stats-mongoservice/dev-lol-stats',
		crossDomain: []
	},
	qa: {
		mongoUrl: 'mongodb://localhost/qa-lol-stats',
		crossDomain: []
	},
	production: {
		mongoUrl: 'mongodb://localhost/prod-lol-stats',
		crossDomain: []
	}
}
