var schema = new Schema({
  matchId:  Number,
  region:  String,
  data:    Schema.Types.Mixed
})

var Match = mongoose.model('Match', schema);

module.exports = matchModel;