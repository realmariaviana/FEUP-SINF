const express = require('express');
const router = express.Router();
const controller = require('../../controllers/request')

/* GET users listing. */
router.get('/', controller.getOrders);
router.post('/', controller.getDeliveryOrder);

module.exports = router;
