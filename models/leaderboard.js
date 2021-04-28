const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const leaderboardSchema = new Schema({
})

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

module.exports = Leaderboard;