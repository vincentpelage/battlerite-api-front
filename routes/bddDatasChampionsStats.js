/*
 * Npm import
 */
const express = require('express');

/*
 * Local import
 */
const bddDatasChampionsStats = require('../controllers/bddDatasChampionsStats');

/*
 * Instanciations
 */

// instanciation du routeur
const router = express.Router();

/*
 * Router
 */

router
  .route('/get-bdd-datas-champions-stats')
  .get(bddDatasChampionsStats);

// export du router contenant les routes
// export default router;
module.exports = router;
