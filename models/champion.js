const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChampionSchema = new Schema({
  currentDate: String,
  actorId: String,
  roleId: Number,
  leagueId: String,
  match: {
    matchId: String,
    createdAt: String,
    gameType: String,
    ranking: String,
    mapId: String,
    nbRounds: Number,
  },
  stats: {
    damageDone: Number,
    damageReceived: Number,
    disablesDone: Number,
    disablesReceived: Number,
    healingDone: Number,
    healingReceived: Number,
    score: Number,
    won: String,
    wonId: Number,
  },
  teammateActorId: Array,
  teamIds: Array,
  roster: {
    rosterId: String,
    stats: {
      league: Number,
      matchRegion: String,
      score: Number,
    }
  }
});

// Création d'un modèle (nom + schéma)
const Champion = mongoose.model('champion', ChampionSchema);

module.exports = Champion;
