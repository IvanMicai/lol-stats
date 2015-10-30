var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
   name: String,
   region:  String,
   summonerId: Number,
   profileIconId: Number,
   revisionDate: Number,
   summonerLevel: Number,
   nameLowercase: String
})

var summonerModel = mongoose.model('Summoner', schema);

module.exports = summonerModel;


