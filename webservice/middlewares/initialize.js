/**
 *  Initialize Middleware
 */

module.exports = function (req, res, next) { 

	res.data = {}
	res.data.summoner = {}
	res.data.matchList = []
	res.data.matches = []

	res.dataSource = {
		summoner: undefined,
		matchList: undefined,
		matches:  undefined
	}

	return next()
};