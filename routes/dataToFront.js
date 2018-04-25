/*
 * Npm import
 */
const express = require('express');

/*
 * Local import
 */
const dataToFront = require('../controllers/dataToFront');

/*
 * Instanciations
 */

// instanciation du routeur
const router = express.Router();

/*
 * Router
 */

router
  .route('/data-to-front')
  .get(dataToFront);

// export du router contenant les routes
// export default router;
module.exports = router;
