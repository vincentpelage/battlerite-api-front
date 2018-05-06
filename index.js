// Package import
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const schedule = require('node-schedule');
const mongoose = require('mongoose');
require('dotenv').config();


// Local import
const topChampions = require('./controllers/bddDatasHome');
const bddDatasChampionsStats = require('./controllers/bddDatasChampionsStats');
const championSynergie = require('./controllers/bddDatasSynergie');
const dataFront = require('./models/dataFront');

// Route import
const home = require('./routes/home');
const apiDatas = require('./routes/apiDatas');
const dataToFront = require('./routes/dataToFront');

// Init variable
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
// Cross origin
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Title-Id, Authorization');
  next();
});

const mongoDB = `mongodb://vincent:${process.env.DB_PASS}@ds113749.mlab.com:13749/battlerite-api`;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoDB connection error: '));
db.once('open', () => {
  // console.log('Connected to the DB');
});

// const getSunday = d => {
//   return new Promise((resolve, reject) => {
//     d = new Date(d);
//     d.setUTCHours(0,0,0);
//     const day = d.getDay();
//     const diff = d.getDate() - day + (day == 7 ? 7:0);
//     resolve(new Date(d.setDate(diff)));
//   })
// }
//
// getSunday(new Date()).then(result => {
//   console.log('sunday: ',result)
// });

//function to add days to a given date.
// function addDays(startDate,numberOfDays)
// {
//   var returnDate = new Date(
//               startDate.getFullYear(),
//               startDate.getMonth(),
//               startDate.getDate()+numberOfDays,
//               startDate.getHours(),
//               startDate.getMinutes(),
//               startDate.getSeconds());
//   return returnDate;
// }
//
// const getMonday = d => {
//   return new Promise((resolve, reject) => {
//     d = new Date(d);
//     d.setUTCHours(0,0,0);
//     const day = d.getDay();
//     const diff = d.getDate() - day + (day == 0 ? -6:-6);
//     resolve(new Date(d.setDate(diff)));
//   })
// }
//
// getMonday(new Date()).then(result => {
//   console.log('monday: ',result);
//   console.log('monday + 6: ',addDays(result,6));
//
// });

app.get('/api/fill-bdd', (req, res) => {
  const initDb = () => {
    return new Promise((resolve, reject) => {
      console.log('Init database...');
      console.log('Remove old documents from collection...');
      db.collection('datafronts').remove( { } );
      console.log('Collection is empty...');
      const newdataFront = new dataFront({})
        .save((err, savedDataFront) => {
          if (err) {
            console.error(err);
            return err;
          }
          resolve(savedDataFront);
        });
    })
  }

  initDb()
  .then(result => {
    console.log('New data file created', result);
    return topChampions();
  })
  .then(result => {
    console.log(result);
    return bddDatasChampionsStats();
  })
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.log(error);
  })
})




// var j = schedule.scheduleJob('04 * * * *', function(){
//   async function createDataFront(){
//     const newdataFront = await new dataFront({})
//     .save((err, savedDataFront) => {
//       if (err) {
//         console.error(err);
//         return err;
//       }
//       console.log(savedDataFront);
//       return null;
//     });
//   }
//   createDataFront().then(result => {
//     getBddDatasHome();
//   });
// });

// app.use('/api', home, bddDatasHome, bddDatasChampionsStats, bddDatasSynergie, apiDatas, dataToFront);
app.use('/api', apiDatas, dataToFront);

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

const port = process.env.PORT || 5000;
app.listen(port);
