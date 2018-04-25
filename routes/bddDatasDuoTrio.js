/*
 * Npm import
 */
const express = require('express');

/*
 * Local import
 */
const getBddDatasDuoTrio = require('../controllers/bddDatasDuoTrio');

/*
 * Instanciations
 */

// instanciation du routeur
const router = express.Router();

/*
 * Router
 */

router
  .route('/get-bdd-datas-duo-trio')
  .get(getBddDatasDuoTrio);

// export du router contenant les routes
// export default router;
module.exports = router;
