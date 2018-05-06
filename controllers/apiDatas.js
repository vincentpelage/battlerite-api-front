const mongoose = require('mongoose');
const axios = require('axios');

// local import
const Champion = require('../models/champion');
// init variable
const key = process.env.KEY_API_BATTLERITE;

const mongoDB = `mongodb://vincent:${process.env.DB_PASS}@ds113749.mlab.com:13749/battlerite-api`;
mongoose.connect(mongoDB);
// lancer et stocker la connexion
const db = mongoose.connection;
// tester la connexion
db.on('error', console.error.bind(console, 'mongoDB connection error: '));
db.once('open', () => {
  // console.log('Connected to the DB');
});


module.exports = function getApiDatas (req, res) {
  const date = {
    startDate: '',
    endDate: '',
  }

  const getData = link => {
    let config = {};
    // console.log(date);
    config.headers = {
      'Accept-Encoding': 'gzip',
      'Authorization': key,
      'Accept': 'application/vnd.api+json'
    }

    axios
      .get(link, config)
      .then((response) => {
        console.log('new request: ', link);
        const dateArr = [];

        response.data.data.map(match => {
          const rosters = match.relationships.rosters.data;
          const nbRounds = match.relationships.rounds.data.length;
          rosters.map(roster => {
            const rosterObj = response.data.included.filter(function( obj ) {
                return obj.type == 'roster' && obj.id == roster.id;
            });
            let wonId = 0
            if(rosterObj[0].attributes.won === 'true'){
              wonId = 1;
            }
            const participants = rosterObj[0].relationships.participants.data;
            participants.map(participant => {
              const participantObj = response.data.included.filter(function( obj ) {
                  return obj.type == 'participant' && obj.id == participant.id;
              });

              const teammates = participants.filter(function(obj) {
                return obj.id !== participant.id;
              })
              const teammateArr = [];
              teammates.map(teammate => {
                const teammateObj = response.data.included.filter(function(obj) {
                  return obj.type == 'participant' && obj.id == teammate.id;
                })
                teammateArr.push(Number(teammateObj[0].attributes.actor));
              })
              const teamIds = [...teammateArr, Number(participantObj[0].attributes.actor)].sort((a, b) => { return a - b });

              dateArr.push(match.attributes.createdAt);

              const newChampion = new Champion({
                actorId: participantObj[0].attributes.actor,
                leagueId: rosterObj[0].attributes.stats.league,
                match: {
                  matchId: match.id,
                  createdAt: match.attributes.createdAt,
                  gameType: match.attributes.stats.type,
                  ranking: match.attributes.tags.rankingType,
                  mapId: match.attributes.stats.mapID,
                  nbRounds: nbRounds,
                },
                stats: {
                  damageDone: participantObj[0].attributes.stats.damageDone,
                  damageReceived: participantObj[0].attributes.stats.damageReceived,
                  disablesDone: participantObj[0].attributes.stats.disablesDone,
                  disablesReceived: participantObj[0].attributes.stats.disablesReceived,
                  healingDone: participantObj[0].attributes.stats.healingDone,
                  healingReceived: participantObj[0].attributes.stats.healingReceived,
                  score: participantObj[0].attributes.stats.score,
                  won: rosterObj[0].attributes.won,
                  wonId: wonId,
                },
                teammateActorId: teammateArr,
                teamIds: teamIds,
                roster: {
                  rosterId: rosterObj[0].id,
                  stats: {
                    matchRegion: rosterObj[0].attributes.stats.matchRegion,
                  }
                }
              })
              .save((err, savedChampion) => {
                if (err) {
                  console.error(err);
                  return err;
                }
                // console.log(savedChampion);
              });
            })
          })
        })
        // res.send(response.data);
        console.log('next link: ', response.data.links.next);
        // console.log(dateArr[dateArr.length - 1]);
        // console.log('date.endDate ', date.endDate);
        if(dateArr[dateArr.length - 1] > date.endDate){
          console.log('All datas were fetched');
          return null;
        } else {
          if(response.data.links.next.search('offset]=10000') === -1){
            console.log('Limite non atteinte, continue ...')
            setTimeout(function(){
              getData(response.data.links.next);
            }, 6100);
          } else {
            console.log('Limite atteinte');
            const newstart = dateArr[dateArr.length - 1];
            const newLink = `https://api.dc01.gamelockerapp.com/shards/global/matches?sort=createdAt&page[limit]=5&filter[createdAt-start]=${newstart}&filter[rankingType]=RANKED`
            console.log('Création d\'un nouveau lien')
            setTimeout(function(){
              getData(newLink);
            }, 6100);

          }
        }

      })
      .catch((error) => {
        console.log(error.response)
      });
  }

  function addDays(startDate,numberOfDays)
  {
    const returnDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()+numberOfDays,
        startDate.getHours()+23,
        startDate.getMinutes()+50,
        startDate.getSeconds());
    return returnDate;
  }

  const getMonday = d => {
    return new Promise((resolve, reject) => {
      d = new Date(d);
      d.setUTCHours(0,0,0);
      const day = d.getDay();
      const diff = d.getDate() - day + (day == 0 ? -6:-6);
      resolve(new Date(d.setDate(diff)));
    })
  }

  getMonday(new Date()).then(result => {
    const startDate = result.toISOString().slice(0, 10);
    date.startDate = startDate;
    date.endDate = addDays(result,6).toISOString().slice(0, 16);

    const link = `https://api.dc01.gamelockerapp.com/shards/global/matches?sort=createdAt&page[limit]=5&filter[createdAt-start]=${startDate}T00:00:00Z&filter[rankingType]=RANKED`;
    getData(link);
  });

  // const startDate = 0;
  // const endDate = '2018-04-29';



};
