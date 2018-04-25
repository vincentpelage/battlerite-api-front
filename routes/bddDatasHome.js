/*
 * Npm import
 */
const express = require('express');

/*
 * Local import
 */
const getBddDatasHome = require('../controllers/bddDatasHome');

/*
 * Instanciations
 */

// instanciation du routeur
const router = express.Router();

/*
 * Router
 */

router
  .route('/get-bdd-datas-home')
  .get(getBddDatasHome);

// export du router contenant les routes
// export default router;
module.exports = router;
