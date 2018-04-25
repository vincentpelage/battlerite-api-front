const mongoose = require('mongoose');

// local import

const mongoDB = `mongodb://vincent:${process.env.DB_PASS}@ds113749.mlab.com:13749/battlerite-api`;
mongoose.connect(mongoDB);
// lancer et stocker la connexion
const db = mongoose.connection;
// tester la connexion
db.on('error', console.error.bind(console, 'mongoDB connection error: '));
db.once('open', () => {
  // console.log('Connected to the DB');
});

module.exports = function dataToFront (req, res) {
    let dataToFront = db.collection('datafronts').find({}).toArray(function(error, results) {
      res.send(results[0]);
    });
};
