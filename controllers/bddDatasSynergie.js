const mongoose = require('mongoose');

// local import
const Champion = require('../models/champion');
const dataFront = require('../models/dataFront');
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




  module.exports = function championSynergie(){
    return new Promise((resolve, reject) => {
      console.log('Starting champions Synergie...');
      const data = {};
      champions.map(champion => {
        data[champion.id] = {};
        // Recupere la somme des parties gagnees et perdues par actor id avec les teammates
        db.collection('champions').aggregate([
          {
            $match: {
              $and: [
                // { 'stats.won': 'false' },
                { 'actorId': champion.id },
              ]
            }
          },
          {
            $group: {
            _id: {
              // won: '$stats.won',
              'teamIds': '$teamIds',
              'gameType': '$match.gameType',
            },
            'won': {
              '$sum': {
                '$cond': [{
                  '$eq': [
                    '$stats.won',
                    'true'
                  ]
                }, 1, 0]
              }
            },
            'lost': {
              '$sum': {
                '$cond': [{
                  '$eq': [
                    '$stats.won',
                    'false'
                  ]
                }, 1, 0]
              }
            },
            count: { $sum: 1 } }
          }

        ]).toArray((err, results) => {
            if(err){
              console.log(err);
            }
            // console.log(results);
            let arrRes = [];
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
                result['countTotal'] = count;

                // if(result._id.gameType == 'LEAGUE2V2'){
                //   result['winrate'] = Number(((result.count / (count / 2)) * 100).toFixed(1));
                // } else {
                //   result['winrate'] = Number(((result.count / (count / 3)) * 100).toFixed(1));
                // }
                if(result._id.gameType == 'LEAGUE2V2'){
                  result['winrate'] = Number(((result.won) / (count / 2) * 100).toFixed(1));
                } else {
                  result['winrate'] = Number(((result.won) / (count / 3) * 100).toFixed(1));
                }

                arrRes.push(result);
                if(arrRes.length == results.length){
                  console.log(champion.name);
                  console.log(arrRes);
                  arrRes.sort(function(a,b) {
                    return (a.winrate < b.winrate) ? 1 : ((b.winrate < a.winrate) ? -1 : 0);
                  });
                  const dataDuo = arrRes.filter(obj => {
                    return obj._id.gameType == 'LEAGUE2V2' && obj.count > 80;
                  });
                  data[champion.id]['duo'] = dataDuo.slice(0, 10);
                  data[champion.id]['duo'].map(elem => {
                    if(Number(elem._id.teamIds[0]) !== Number(champion.id)){
                      const mate = elem._id.teamIds[0];
                      elem._id.teamIds.shift();
                      elem._id.teamIds.push(mate)
                    }
                  })

                  // const dataTrio = arrRes.filter(obj => {
                  //   return obj._id.gameType == 'LEAGUE3V3' && obj.count > 15;
                  // })
                  // data[champion.id]['trio'] = dataTrio.slice(0, 10);
                  // data[champion.id]['trio'].map(elem => {
                  //   if(Number(elem._id.teamIds[0]) !== Number(champion.id)){
                  //     if(Number(elem._id.teamIds[1]) !== Number(champion.id)){
                  //       const mate1 = elem._id.teamIds[0];
                  //       const mate2 = elem._id.teamIds[1];
                  //       elem._id.teamIds = elem._id.teamIds.slice(2);
                  //       elem._id.teamIds.push(mate1);
                  //       elem._id.teamIds.push(mate2);
                  //     } else {
                  //       const mate = elem._id.teamIds[0];
                  //       elem._id.teamIds.shift();
                  //       elem._id.teamIds.push(mate)
                  //     }
                  //   }
                  // })

                  db.collection('datafronts').update(
                    { id: 1 },
                    { $set:
                       {
                         bestSynergies: data,
                       }
                    }
                  )
                  resolve('Champions Synergie was updated');
                }
              })
            })
          });
      });
    })
  }
