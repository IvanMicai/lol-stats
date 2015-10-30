var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  matchId:  Number,
  region:  String,
  data:    Schema.Types.Mixed
})

var matchModel = mongoose.model('Match', schema);

module.exports = matchModel;