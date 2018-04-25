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

module.exports = function bddDatasChampionsStats (req, res) {
  return new Promise((resolve, reject) => {
    console.log('6. Starting bddDatasChampionsStats');
    const arrRes = {
      'global': [],
      'globalPerLeague': {},
      'league2v2': [],
      'league2v2PerLeague': {},
      'league3v3': [],
      'league3v3PerLeague': {},
      'nbMatch': {
        'global': 0,
        'league2v2': 0,
        'league3v3': 0,
        'globalPerLeague': {},
        'league2v2PerLeague': {},
        'league3v3PerLeague': {},
      },
    };

    const leagues = [-1, 0, 1, 2, 3, 4, 5, 6];

    function storeInDb(arrRes) {
      db.collection('datafronts').update(
        { id: 1 },
        { $set:
           {
             championStats: arrRes,
           }
        }
      )
    };

    function championsStats (gameType, league = '') {
      return new Promise((resolve, reject) => {
        console.log('Starting championsStats ' + gameType);
        champions.map(champion => {
          async function getGameType(){
            if(gameType === 'league2v2' || gameType === 'league3v3'){
              if(league === ''){
                const option = await  {
                  $and: [
                    { 'actorId': champion.id },
                    { 'match.gameType': gameType.toUpperCase() },
                  ]
                };
                return option;
              } else {
                const option = await  {
                  $and: [
                    { 'actorId': champion.id },
                    { 'match.gameType': gameType.toUpperCase() },
                    { 'leagueId': league.toString() },
                  ]
                };
                return option;
              }
            } else if(gameType === 'global' || gameType === 'globalPerLeague') {
              if(league === ''){
                const option = await {
                  $and: [
                    { 'actorId': champion.id },
                  ]
                };
                return option;
              } else {
                const option = await {
                  $and: [
                    { 'actorId': champion.id },
                    { 'leagueId': league.toString() },
                  ]
                };
                return option;
              }
            } else {
              if(gameType === 'league2v2PerLeague'){
                const option = await {
                  $and: [
                    { 'actorId': champion.id },
                    { 'leagueId': league.toString() },
                    { 'match.gameType': 'LEAGUE2V2' },
                  ]
                };
                return option;
              } else {
                const option = await {
                  $and: [
                    { 'actorId': champion.id },
                    { 'leagueId': league.toString() },
                    { 'match.gameType': 'LEAGUE3V3' },
                  ]
                };
                return option;
              }
            }
          }

          getGameType().then(option => {
            nbMatchs(option).then(function(nbMatchs){
              db.collection('champions').aggregate([
              {
                $match: option
              },
              {
                $group: { _id: { actorId: '$actorId' },
                  damageDone: { $sum: '$stats.damageDone' },
                  damageReceived: { $sum: '$stats.damageReceived' },
                  disablesDone: { $sum: '$stats.disablesDone' },
                  disablesReceived: { $sum: '$stats.disablesReceived' },
                  healingDone: { $sum: '$stats.healingDone' },
                  healingReceived: { $sum: '$stats.healingReceived' },
                  score: { $sum: '$stats.score' },
                  rounds: { $sum: '$match.nbRounds' },
                  wins: { $sum: '$stats.wonId' },
                }
              },
              { $sort: { total: -1 } }
              ]).toArray((err, results) => {
                if(err){
                  console.log(err);
                }
                data = {};
                data['id'] = Number(champion.id);
                data['name'] = champion.name;
                data['role'] = champion.role;
                data['nbMatchs'] = nbMatchs;

                if(gameType === 'global' || gameType === 'league2v2' || gameType === 'league3v3'){
                  arrRes.nbMatch[gameType] += data['nbMatchs'];
                } else {
                  if(!arrRes.nbMatch[gameType][league]){
                    arrRes.nbMatch[gameType][league] = 0;
                    arrRes.nbMatch[gameType][league] += data['nbMatchs'];
                  } else {
                    arrRes.nbMatch[gameType][league] += data['nbMatchs'];
                  }
                }


                if(results[0]){
                  data['winRate'] = Number(((results[0].wins / nbMatchs) * 100).toFixed(1));
                  const rounds = (results[0].rounds).toFixed(1);
                  data['damageDone'] = Number((results[0].damageDone / rounds).toFixed(1));
                  data['damageReceived'] = Number((results[0].damageReceived / rounds).toFixed(1));
                  data['disablesDone'] = Number((results[0].disablesDone / rounds).toFixed(1));
                  data['disablesReceived'] = Number((results[0].disablesReceived / rounds).toFixed(1));
                  data['healingDone'] = Number((results[0].healingDone / rounds).toFixed(1));
                  data['healingReceived'] = Number((results[0].healingReceived / rounds).toFixed(1));
                  data['score'] = Number((results[0].score / rounds).toFixed(1));
                } else {
                  data['winRate'] = 0;
                  const rounds = 0;
                  data['damageDone'] = 0;
                  data['damageReceived'] = 0;
                  data['disablesDone'] = 0;
                  data['disablesReceived'] = 0;
                  data['healingDone'] = 0;
                  data['healingReceived'] = 0;
                  data['score'] = 0;
                }
                // console.log(data)
                if(league === ''){
                  arrRes[gameType].push(data);
                  if(arrRes[gameType].length == champions.length){
                    arrRes[gameType].sort(function(a,b) {
                      return (a.winRate < b.winRate) ? 1 : ((b.winRate < a.winRate) ? -1 : 0);
                    });
                    // storeInDb(arrRes);
                    resolve(gameType + ' was stored');
                  }
                } else {
                  // console.log(champion.name);
                  console.log('league : ' + league + ' : championName ' + champion.name);
                  // console.log('data', data);

                  if(gameType === 'globalPerLeague'){
                    if(!arrRes.globalPerLeague[league.toString()]){
                      arrRes.globalPerLeague[league.toString()] = [];
                    }

                    arrRes.globalPerLeague[league.toString()].push(data);
                    if(arrRes.globalPerLeague[league.toString()].length == champions.length){
                      arrRes.globalPerLeague[league.toString()].sort(function(a,b) {
                        return (a.winRate < b.winRate) ? 1 : ((b.winRate < a.winRate) ? -1 : 0);
                      });
                      console.log('league ' + league + ' ' + gameType + ' ' + arrRes.globalPerLeague[league.toString()].length);
                      // storeInDb(arrRes);
                      resolve(gameType + ' was stored');
                    }
                  } else if (gameType === 'league2v2PerLeague') {
                    if(!arrRes.league2v2PerLeague[league.toString()]){
                      arrRes.league2v2PerLeague[league.toString()] = [];
                    }

                    arrRes.league2v2PerLeague[league.toString()].push(data);
                    if(arrRes.league2v2PerLeague[league.toString()].length == champions.length){
                      arrRes.league2v2PerLeague[league.toString()].sort(function(a,b) {
                        return (a.winRate < b.winRate) ? 1 : ((b.winRate < a.winRate) ? -1 : 0);
                      });
                      console.log('league ' + league + ' ' + gameType + ' ' + arrRes.league2v2PerLeague[league.toString()].length);
                      // storeInDb(arrRes);
                      resolve(gameType + ' was stored');
                    }
                  } else {
                    if(!arrRes.league3v3PerLeague[league.toString()]){
                      arrRes.league3v3PerLeague[league.toString()] = [];
                    }

                    arrRes.league3v3PerLeague[league.toString()].push(data);
                    if(arrRes.league3v3PerLeague[league.toString()].length == champions.length){
                      arrRes.league3v3PerLeague[league.toString()].sort(function(a,b) {
                        return (a.winRate < b.winRate) ? 1 : ((b.winRate < a.winRate) ? -1 : 0);
                      });
                      console.log('league ' + league + ' ' + gameType + ' ' + arrRes.league3v3PerLeague[league.toString()].length);
                      // storeInDb(arrRes);
                      resolve(gameType + ' was stored');
                    }
                  }
                }
              });
            })
          })
          async function nbMatchs (option) {
            const nbMatchs = await db.collection('champions').find(option).count();
            return nbMatchs;
          }
        });
      })
    }

    function globalStats(){
      return new Promise((resolve, reject) => {
        championsStats('global')
        .then(result => {
          console.log(result);
          return championsStats('league2v2');
        })
        .then(result => {
          console.log(result);
          return championsStats('league3v3');
        })
        .then(result => {
          console.log(result);
          resolve('Global stats END');
        })
        .catch(error => {
          console.log(error);
        })

      })
    }

    function leaguesStats(){
      return new Promise((resolve, reject) => {
        const promises = [];
        for(let i = -1 ; i < 7 ; i++){
          promises.push(championsStats('globalPerLeague', i));
          promises.push(championsStats('league2v2PerLeague', i));
          promises.push(championsStats('league3v3PerLeague', i));
        }
        Promise.all(promises)
          .then(() => {
            resolve('League stats end')
          })
      })
    }

    // function leaguesStats(){
    //   return new Promise((resolve, reject) => {
    //     leagues.map(league => {
    //       championsStats('globalPerLeague', league);
    //       championsStats('league2v2PerLeague', league);
    //       championsStats('league3v3PerLeague', league);
    //     })
    //   })
    // }

  globalStats()
    .then(result => {
      console.log(result);
      return leaguesStats();
    })
    .then(result => {
      console.log(result);
      storeInDb(arrRes);
      resolve('Champions stats were successfuly stored in database')
    })
  })
};
