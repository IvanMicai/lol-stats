var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  summonerId:  Number,
  region:      String,
  season:      String,
  data:        Schema.Types.Mixed,
  rules:       Schema.Types.Mixed,
  total:       Schema.Types.Mixed
})

var summonerChampions = mongoose.model('SummonerChampions', schema);

module.exports = summonerChampions;
