const { Router } = require('express');
const frontendRoutes = require('../controllers/frontendController');

const router = Router();

router.get('/infoskjerm',frontendRoutes.infoskjerm_get);

module.exports = router;