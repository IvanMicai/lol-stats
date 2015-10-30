/**
 *  Response Handler Controller
 */

var request = require('request');

module.exports = function (req, res, next) { 
	res.send(res.data); 
};
