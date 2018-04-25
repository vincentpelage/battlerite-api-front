// Package import
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const schedule = require('node-schedule');
require('dotenv').config();


// Local import
const topChampions = require('./controllers/bddDatasHome');
const bddDatasChampionsStats = require('./controllers/bddDatasChampionsStats');
const championSynergie = require('./controllers/bddDatasSynergie');
const dataFront = require('./models/dataFront');

// Route import
const home = require('./routes/home');
// const bddDatasHome = require('./routes/bddDatasHome');
// const bddDatasChampionsStats = require('./routes/bddDatasChampionsStats');
// const bddDatasSynergie = require('./routes/bddDatasSynergie');
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

// function oneToFive(){
//   return new Promise(function(resolve, reject){
//     let arr = [];
//     for(let i = 0 ; i < 6 ; i++){
//       arr.push(i);
//     }
//     resolve(arr[arr.length-1]);
//   })
// }
//
// function fiveToTen(){
//   return new Promise(function(resolve, reject){
//     let arr = [];
//     for(let i = 5 ; i < 11 ; i++){
//       arr.push(i);
//     }
//     resolve(arr[arr.length-1]);
//   })
// }
//
// // oneToFive()
// //   .then(result => {
// //     console.log(result);
// //   })
// //   .catch(error => {
// //     console.log(error);
// //   })
//
// Promise.all([oneToFive(), fiveToTen()])
//   .then(function(data){
//     console.log(data[0]);
//     console.log(data[1]);
//   })

// const initDb = () => {
//   return new Promise((resolve, reject) => {
//     console.log('Init database...');
//     const newdataFront = new dataFront({})
//       .save((err, savedDataFront) => {
//         if (err) {
//           console.error(err);
//           return err;
//         }
//         resolve(savedDataFront);
//       });
//   })
// }
//
// initDb()
// .then(result => {
//   console.log('New data file created', result);
//   return topChampions();
// })
// .then(result => {
//   console.log(result);
//   return bddDatasChampionsStats();
// })
// .then(result => {
//   console.log(result);
//   return championSynergie();
// })
// .then(result => {
//   console.log(result);
// })
// .catch(error => {
//   console.log(error);
// })



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
