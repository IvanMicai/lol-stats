var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  matchId:    Number,
  summonerId: Number,
  region:     String,
  totalGames: Number,
  matches:    [Schema.Types.Mixed],
  lane:       Schema.Types.Mixed
})

var matchListsModel = mongoose.model('MatchList', schema);

module.exports = matchListsModel;
