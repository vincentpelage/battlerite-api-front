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
  console.log('Connected to the DB');
});

module.exports = function getBddDatasDuoTrio (req, res) {

  // champions.map(champion => {
  //   // Recupere la somme des parties gagnees et perdues par actor id avec les teammates
  //   db.collection('champions').aggregate([
  //     { $match: { 'actorId': champion.id } },
  //     {
  //       $group: {
  //       _id: {actorId: '$actorId', won: '$stats.won',
  //       actorIdTeammate1: { "$arrayElemAt": [ "$teammateActorId", 0 ] },
  //       actorIdTeammate2: { "$arrayElemAt": [ "$teammateActorId", 1 ] }
  //       },
  //       count: { $sum: 1 } }
  //     }
  //
  //   ]).toArray((err, results) => {
  //       if(err){
  //         console.log(err);
  //       }
  //       const nbMatchs = results.length;
  //       // console.log('nbMatchs: ', nbMatchs);
  //       const arrayMatchsWon = results.filter(result => {
  //         return result._id.won === "true";
  //       })
  //       const nbMatchWon = arrayMatchsWon.length;
  //       // console.log('nbMatchWon: ', nbMatchWon);
  //       const winRate = (nbMatchWon / nbMatchs * 100).toFixed(2);
  //       console.log(`winRate ${champion.name}: ${winRate} %`);
  //       // res.send(results);
  //     });
  // })


    // Recupere la somme des parties gagnees et perdues par actor id avec les teammates
    db.collection('champions').aggregate([
      {
        $match: {
          $and: [
            // { 'actorId': '613085868' },
            // { 'match.gameType': 'LEAGUE2V2' },
            { 'stats.won': 'true' },
          ]
        }
      },
// CREER EN BDD UN ARRAY AVEC UNE PROPRIETE ACTORS CONTENANT TOUS LES ACTORS DUN ROSTER
      {
        $group: {
        _id: {
          won: '$stats.won',
          teamIds: '$teamIds',
          gameType: '$match.gameType',
        },
        count: { $sum: 1 } }
      }

    ]).toArray((err, results) => {
        if(err){
          console.log(err);
        }
        const arrRes = [];
        results.map(result => {
          async function comptage () {
            const count = await db.collection('champions').find(
                 {
                   'teamIds': result._id.teamIds,
                 }
            ).count();
            return count;
          }
          comptage().then(function(count){
            result['winrate'] = (result.count / count) * 100;
            arrRes.push(result);
            if(arrRes.length == results.length){
              arrRes.sort(function(a,b) {
                return (a.winrate < b.winrate) ? 1 : ((b.winrate < a.winrate) ? -1 : 0);
              });
              const data = {};
              data['duo'] = arrRes.filter(obj => {
                return obj._id.gameType == 'LEAGUE2V2';
              })
              data['trio'] = arrRes.filter(obj => {
                return obj._id.gameType == 'LEAGUE3V3';
              })
              res.send(data);
            }
          })
        })
      });
};
