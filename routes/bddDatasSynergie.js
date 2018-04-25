/*
 * Npm import
 */
const express = require('express');

/*
 * Local import
 */
const getBddDatasSynergie = require('../controllers/bddDatasSynergie');

/*
 * Instanciations
 */

// instanciation du routeur
const router = express.Router();

/*
 * Router
 */

router
  .route('/get-bdd-datas-synergie')
  .get(getBddDatasSynergie);

// export du router contenant les routes
// export default router;
module.exports = router;
