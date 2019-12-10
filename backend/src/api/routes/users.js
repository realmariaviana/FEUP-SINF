const express = require('express');
const router = express.Router();
const controller = require('../../controllers/request')

/* GET users listing. */
router.post('/', controller.requestAccessToken);

router.get('/', controller.getOrders);

router.post('/sales', controller.createSalesOrder);

module.exports = router;
