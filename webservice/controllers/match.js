/**
 *  Match List Controller
 */

var request = require('request');

module.exports = function (req, res, next) { 
	if(res.dataSource === 'external'){
		var match = {
			matchId: parseInt(req.params.matchId, 10),
			region: req.query.region, 
			data: res.data, 
		};

		res.data = match;
	}

	return next()	
};