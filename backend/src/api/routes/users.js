const express = require('express');
const router = express.Router();
const controller = require('../../controllers/request')

/* GET users listing. */
router.post('/pos', controller.processPos);
router.post('/dos', controller.processDOs);
router.post('/sis', controller.processSI);
router.post('/ps', controller.processP)
//router.post('/invoiceSales', controller.createSalesInvoice)
module.exports = router;
