const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataFrontSchema = new Schema({
  id: { type: Number, default: 1 },
  topChampions: Object,
  championStats: Object,
  championStats2v2: Object,
  championStats3v3: Object,
  bestSynergies: Object,
});

// Création d'un modèle (nom + schéma)
const dataFront = mongoose.model('datafronts', dataFrontSchema);

module.exports = dataFront;
