/**
 *  Summoner Save Middleware
 */

var env     = process.env.NODE_ENV || 'development'

var request = require('request');
var mongoose = require('mongoose');
var path = require('../utils/path.js')

var summonerModel = require(path.models + '/summoner')
var envConfig = require(path.config + '/env')[env]

mongoose.connect(envConfig.mongoUrl);

module.exports = function (req, res, next) { 
	if(res.dataSource.summoner === 'internal'){
		return next()
	}

	//Add Lowercase name
	res.data.summoner.nameLowercase = req.params.name.toLowerCase()

	summonerModel.findOneAndUpdate({ name: req.params.name.toLowerCase() }, res.data.summoner, {new: true, upsert: true}, function (err, summoner, c) {
		if (err){
			console.log('meow');
			return next()
		}else{
	    	console.log('saved');
	    	res.data.summoner = summoner
		 	return next()
		}
	})

};