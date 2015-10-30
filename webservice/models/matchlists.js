var schema = new Schema({
  matchId:  Number,
  region:  String,
  totalGames: Number,
  matches:    [Schema.Types.Mixed]
})

var matchListsModel = mongoose.model('MacthLists', schema);

module.exports = matchListsModel;