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
    const data = {
      '2v2synergie': {},
      '3v3synergie': {},
    };
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
              $group: {
              _id: {
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
                console.log('err');
              }
              let arrRes = [];

              const calculWinrate = (result) => {
                return new Promise((resolve, reject) => {
                  result['winrate'] = Number(((result.won / result.count) * 100).toFixed(1));
                  arrRes.push(result);
                  resolve('WinRate added');
                })
              }

              function addWinRate(){
                return new Promise((resolve, reject) => {
                  console.log('Starting addWinRate()...');
                  const promises = [];
                  results.map(result => {
                    promises.push(calculWinrate(result));
                  })
                  Promise.all(promises)
                    .then((resolved) => {
                      resolve('All winrate added');
                    })
                })
              }

              function sortWinRate(){
                return new Promise((resolve, reject) =>{
                  console.log('Starting sortWinRate()...');
                  const arrResSorted =
                  arrRes.sort(function(a,b) {
                    return (a.winrate < b.winrate) ? 1 : ((b.winrate < a.winrate) ? -1 : 0);
                  });
                  resolve(arrResSorted);
                })
              }

              function getTop12Duo(){
                return new Promise((resolve, reject) => {
                  console.log('Starting getTop10Duo()...');
                  const dataDuo = arrRes.filter(obj => {
                    return obj._id.gameType == 'LEAGUE2V2' && (obj.count / 2) > 250;
                  });
                  data['duo'] = dataDuo.slice(0, 12);
                  resolve(data['duo']);
                })
              }

              function getTop12Trio(){
                return new Promise((resolve, reject) => {
                  console.log('Starting getTop10Trio()...');
                  const dataTrio = arrRes.filter(obj => {
                    return obj._id.gameType == 'LEAGUE3V3' && (obj.count / 3) > 40;
                  })
                  data['trio'] = dataTrio.slice(0, 12)
                  resolve(data['trio']);
                })
              }

              function getDuoSynergie(championId){
                return new Promise((resolve, reject) => {
                  const newArrRes = [...arrRes];
                  data['2v2synergie'][championId] = newArrRes.filter(obj => {
                    return obj._id.teamIds.some(elem => {
                      return elem === Number(championId);
                    }) && obj._id.gameType == 'LEAGUE2V2';
                  });
                  data['2v2synergie'][championId] = data['2v2synergie'][championId].filter(obj => {
                    obj = {...obj};
                    return (obj.count / 2) > 80;
                  });
                  data['2v2synergie'][championId] = data['2v2synergie'][championId].slice(0, 10);
                  data['2v2synergie'][championId] = data['2v2synergie'][championId].map(obj => {
                    if(Number(obj._id.teamIds[0]) !== Number(championId)){
                      obj = {...obj};
                      obj._id = {...obj._id};
                      obj._id.teamIds = [...obj._id.teamIds];
                      const mate = obj._id.teamIds[0];
                      obj._id.teamIds.shift();
                      obj._id.teamIds.push(mate)
                    }
                    return obj;
                  })
                  resolve(data['2v2synergie'][championId]);
                })
              }

              function addDuoSynergie(){
                return new Promise((resolve, reject) => {
                  console.log('Starting addDuoSynergie()...');
                  const promises = [];
                  champions.map(champion => {
                    promises.push(getDuoSynergie(champion.id));
                  })
                  Promise.all(promises)
                    .then((resolved) => {
                      resolve('All synergie added');
                    })
                })
              }

              function getTrioSynergie(championId){
                return new Promise((resolve, reject) => {
                  data['3v3synergie'][championId] = arrRes.filter(obj => {
                    return obj._id.teamIds.some(elem => {
                      return elem === Number(championId);
                    }) && obj._id.gameType == 'LEAGUE3V3';
                  });
                  data['3v3synergie'][championId] = data['3v3synergie'][championId].filter(obj => {
                    return (obj.count / 3) > 40;
                  });
                  data['3v3synergie'][championId] = data['3v3synergie'][championId].slice(0, 10);
                  data['3v3synergie'][championId] = data['3v3synergie'][championId].map(obj => {
                    if(Number(obj._id.teamIds[0]) !== Number(championId)){
                      obj = {...obj};
                      obj._id = {...obj._id};
                      obj._id.teamIds = [...obj._id.teamIds];
                      if(Number(obj._id.teamIds[1]) !== Number(championId)){
                        const mate1 = obj._id.teamIds[0];
                        const mate2 = obj._id.teamIds[1];
                        obj._id.teamIds = obj._id.teamIds.slice(2);
                        obj._id.teamIds.push(mate1);
                        obj._id.teamIds.push(mate2);
                      } else {
                        const mate = obj._id.teamIds[0];
                        obj._id.teamIds.shift();
                        obj._id.teamIds.push(mate);
                      }
                    }
                    return obj;
                  })
                  resolve(data['3v3synergie'][championId]);
                })
              }

              function addTrioSynergie(){
                return new Promise((resolve, reject) => {
                  console.log('Starting addTrioSynergie()...');
                  const promises = [];
                  champions.map(champion => {
                    promises.push(getTrioSynergie(champion.id));
                  })
                  Promise.all(promises)
                    .then((resolved) => {
                      resolve('All synergie added');
                    })
                })
              }

              function saveBdd(){
                return new Promise((resolve, reject) => {
                  db.collection('datafronts').update(
                    { id: 1 },
                    { $set:
                       {
                         topChampions: data,
                       }
                    }
                  )
                  resolve('Datas saved in Database');
                })
              }

              addWinRate().then(resolved => {
                console.log(resolved);
                return sortWinRate();
              })
              .then(resolved => {
                console.log('WinRate was sorted');
                return getTop12Duo();
              })
              .then(resolved => {
                console.log('getTop10Duo was created');
                return getTop12Trio();
              })
              .then(resolved => {
                console.log('getTop10Trio was created');
                return addDuoSynergie();
              })
              .then(resolved => {
                console.log('addDuoSynergie was created');
                return addTrioSynergie();
              })
              .then(resolved => {
                console.log('addTrioSynergie was created');
                return saveBdd();
              })
              .then(resolved => {
                console.log(resolved);
                resolve('Top champions duo and trio were updated');
              })


                // async function comptage () {
                //   const count = await db.collection('champions').find(
                //        {
                //          'teamIds': result._id.teamIds,
                //        }
                //   ).count();
                //   return count;
                // }
                // comptage().then(function(count){
                //   console.log('.then');
                //   result['winrate'] = Number(((result.count / count) * 100).toFixed(1));
                //   arrRes.push(result);
                //   if(arrRes.length == results.length){
                //     arrRes.sort(function(a,b) {
                //       return (a.winrate < b.winrate) ? 1 : ((b.winrate < a.winrate) ? -1 : 0);
                //     });
                //
                //   champions.map(champion => {
                //     data['2v2'][champion.id] = arrRes.filter(elem => {
                //       elem._id.teamIds.some(ele => {
                //         return ele == champion.id && elem.gameType == 'LEAGUE2V2';
                //       })
                //     });
                //     data['3v3'][champion.id] = arrRes.filter(elem => {
                //       elem._id.teamIds.some(ele => {
                //         return ele == champion.id && elem.gameType == 'LEAGUE3V3';
                //       })
                //     });
                //     data['2v2'][champion.id] = data[champion.id].slice(0, 10);
                //     data['3v3'][champion.id] = data[champion.id].slice(0, 10);
                //     console.log(['2v2'][champion.id]);
                //     console.log(['3v3'][champion.id]);
                //   })
                //
                //     const dataDuo = arrRes.filter(obj => {
                //       return obj._id.gameType == 'LEAGUE2V2' && (obj.count / 2) > 80;
                //     });
                //     data['duo'] = dataDuo.slice(0, 12);
                //
                //     const dataTrio = arrRes.filter(obj => {
                //       return obj._id.gameType == 'LEAGUE3V3' && (obj.count / 3) > 15;
                //     })
                //     data['trio'] = dataTrio.slice(0, 12);
                //     // res.send(data);
                //
                //
                //     db.collection('datafronts').update(
                //       { id: 1 },
                //       { $set:
                //          {
                //            topChampions: data,
                //          }
                //       }
                //     )
                //     resolve('Top champions duo and trio were updated');
                //   }
                // })
              })
            // });
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
