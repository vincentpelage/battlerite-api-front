const mongoose = require('mongoose');

// local import
const Champion = require('../models/champion');
const champions = require('./utils/actorsId.js')

const mongoDB = `mongodb://vincent:${process.env.DB_PASS}@ds113749.mlab.com:13749/battlerite-api`;
mongoose.connect(mongoDB);
// lancer et stocker la connexion
const db = mongoose.connection;
// tester la connexion
db.on('error', console.error.bind(console, 'mongoDB connection error: '));
db.once('open', () => {
  // console.log('Connected to the DB');
});

module.exports = function getBddDatasSolo (req, res) {
  const arrRes = [];
  champions.map(champion => {
    // Recupere la somme des parties gagnees et perdues par actor id avec les teammates
    db.collection('champions').aggregate([
      { $match: { 'actorId': champion.id } },
      {
        $group: {
        _id: {actorId: '$actorId', won: '$stats.won',
        actorIdTeammate1: { "$arrayElemAt": [ "$teammateActorId", 0 ] },
        actorIdTeammate2: { "$arrayElemAt": [ "$teammateActorId", 1 ] }
        },
        count: { $sum: 1 } }
      }

    ]).toArray((err, results) => {
        if(err){
          console.log(err);
        }
        const nbMatchs = results.length;
        // console.log('nbMatchs: ', nbMatchs);
        const arrayMatchsWon = results.filter(result => {
          return result._id.won === "true";
        })
        const nbMatchWon = arrayMatchsWon.length;
        const winRate = nbMatchWon / nbMatchs * 100;
        const dataChampion = {};
        dataChampion['id'] = champion.id;
        dataChampion['winrate'] = winRate;
        arrRes.push(dataChampion);
        if(arrRes.length == champions.length){
          arrRes.sort(function(a,b) {
            return (a.winrate < b.winrate) ? 1 : ((b.winrate < a.winrate) ? -1 : 0);
          });
          res.send(arrRes);
        }

      });
  })
};
