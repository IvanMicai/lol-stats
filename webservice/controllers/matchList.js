/**
 *  Match List Controller
 */

var request = require('request');

module.exports = function (req, res, next) {
	if(res.dataSource === 'external'){
		var lane = {
			MID: 0,
			TOP: 0,
			BOTTOM: 0,
			JUNGLE: 0
		}

    console.log(res.data)

		for (var i = 0; i < res.data.matches.length; i++) {
			lane[res.data.matches[i].lane] += 1
		};

		res.data.lane = lane;
	}

	return next()
};
