const express = require('express');
const router = express.Router();
const controller = require('../../controllers/request')

/* GET users listing. */
router.post('/', controller.requestAccessToken);

router.get('/', controller.getOrders);

module.exports = router;
