var path     = require('path')
var rootPath = path.resolve(__dirname + '/..')

module.exports = {
  controllers: rootPath + '/controllers',
  middlewares:  rootPath + '/middlewares',
  config:  rootPath + '/config',
  models:  rootPath + '/models',
  lib:  rootPath + '/lib'
}