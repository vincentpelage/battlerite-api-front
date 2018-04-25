/*
 * Npm import
 */
const express = require('express');

/*
 * Local import
 */
const getBddDatasSolo = require('../controllers/bddDatasSolo');

/*
 * Instanciations
 */

// instanciation du routeur
const router = express.Router();

/*
 * Router
 */

router
  .route('/get-bdd-datas-solo')
  .get(getBddDatasSolo);

// export du router contenant les routes
// export default router;
module.exports = router;
