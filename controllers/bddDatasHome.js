const mongoose = require('mongoose');

// local import
const Champion = require('../models/champion');
const dataFront = require('../models/dataFront');
const champions = require('./utils/actorsId.js')
const bddDatasChampionsStats = require('./bddDatasChampionsStats');
const getBddDatasDuoTrio = require('./bddDatasSynergie');

const mongoDB = `mongodb://vincent:${process.env.DB_PASS}@ds113749.mlab.com:13749/battlerite-api`;
mongoose.connect(mongoDB);
// lancer et stocker la connexion
const db = mongoose.connection;
// tester la connexion
db.on('error', console.error.bind(console, 'mongoDB connection error: '));
db.once('open', () => {
  // console.log('Connected to the DB');
});

module.exports = function topChampions(){
  return new Promise((resolve, reject) => {
    console.log('Starting top champions...');
    const data = {};
    const arrResSolo = [];

    function topChampionsSolo(){
      return new Promise((resolve, reject) => {
        console.log('Starting Top champions solo...');
        champions.map(champion => {
          async function nbMatchs () {
            const nbMatchs = await db.collection('champions').find(
             {
                 $and: [
                   { 'actorId': champion.id },
                 ]
             }
            ).count();
              return nbMatchs;
            }
            nbMatchs().then(function(nbMatchs){
              db.collection('champions').aggregate([
              {
                $match: {
                  $and: [
                    { 'actorId': champion.id },
                  ]
                }
              },
              {
                $group: { _id: { actorId: '$actorId' },
                  wins: { $sum: '$stats.wonId' },
                }
              },
              { $sort: { total: -1 } }
              ]).toArray((err, results) => {
                if(err){
                  console.log(err);
                }
                const datan = {};
                datan['id'] = Number(champion.id);
                datan['name'] = champion.name;
                datan['nbMatchs'] = nbMatchs;
                if(results[0]){
                  datan['winrate'] = Number(((results[0].wins / nbMatchs) * 100).toFixed(1));
                } else {
                  datan['winrate'] = 0;
                }
                arrResSolo.push(datan);
                if(arrResSolo.length == champions.length){
                  arrResSolo.sort(function(a,b) {
                    return (a.winrate < b.winrate) ? 1 : ((b.winrate < a.winrate) ? -1 : 0);
                  });
                  // console.log(arrResSolo);
                  data['solo'] = arrResSolo;
                  resolve('Top champions solo was updated');
                }
              });
            })
        })
      })
    }

      function topChampionsDuoAndTrio(){
        return new Promise((resolve, reject) => {
          console.log('Starting top champions duo and trio...');
          db.collection('champions').aggregate([
            {
              $match: {
                $and: [
                  { 'stats.won': 'true' },
                ]
              }
            },
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
                console.log('err');
              }
              let arrRes = [];
              results.map(result => {
                console.log(result);
                async function comptage () {
                  const count = await db.collection('champions').find(
                       {
                         'teamIds': result._id.teamIds,
                       }
                  ).count();
                  return count;
                }
                comptage().then(function(count){
                  result['winrate'] = Number(((result.count / count) * 100).toFixed(1));
                  arrRes.push(result);
                  if(arrRes.length == results.length){
                    // arrRes = arrRes.filter(elem => {
                    //   return elem.count > 100;
                    // })
                    arrRes.sort(function(a,b) {
                      return (a.winrate < b.winrate) ? 1 : ((b.winrate < a.winrate) ? -1 : 0);
                    });
                    const dataDuo = arrRes.filter(obj => {
                      return obj._id.gameType == 'LEAGUE2V2' && (obj.count / 2) > 80;
                    });
                    data['duo'] = dataDuo.slice(0, 12);

                    const dataTrio = arrRes.filter(obj => {
                      return obj._id.gameType == 'LEAGUE3V3' && (obj.count / 3) > 15;
                    })
                    data['trio'] = dataTrio.slice(0, 12);
                    // res.send(data);


                    db.collection('datafronts').update(
                      { id: 1 },
                      { $set:
                         {
                           topChampions: data,
                         }
                      }
                    )
                    resolve('Top champions duo and trio were updated');
                  }
                })
              })
            });
        })
      }
    topChampionsSolo()
      .then(result => {
        console.log(result);
        return topChampionsDuoAndTrio();
      })
      .then(result => {
        console.log(result);
        resolve('Top champions was successfuly stored in database');
      })
      .catch(error => {
        console.log(error);
      })
  })

}
