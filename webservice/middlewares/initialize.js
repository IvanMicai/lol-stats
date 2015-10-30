/**
 *  Initialize Middleware
 */

module.exports = function (req, res, next) { 

	res.data = {}
	res.dataSource = undefined

	return next()
};