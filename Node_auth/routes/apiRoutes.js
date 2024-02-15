const { Router } = require('express');
const apiController = require('../controllers/apiController');

const router = Router();

router.get('/data', apiController.getData);
router.put('/data/updateOrder', apiController.updateOrder);
router.delete('/data/delete/:id', apiController.deleteData);

module.exports = router;
