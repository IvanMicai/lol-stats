/**
 *  Summoner Controller
 */

var request = require('request');

module.exports = function (req, res, next) { 
	//Fix LOL Api root Key
	if(res.dataSource === 'external'){
		res.data = res.data[Object.keys(res.data)]
		res.data.summonerId = res.data.id
	}
	
	//Add Lowercase name
	res.data.nameLowercase = req.params.name.toLowerCase()
	
	return next()	
};