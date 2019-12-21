const express = require('express');
const router = express.Router();
const controller = require('../../controllers/request')

/* GET users listing. */
router.post('/pos', controller.frontCallPos);
router.post('/dos', controller.frontCallDos);
router.post('/sis', controller.frontCallSis);
router.post('/ps', controller.frontCallP)

//router.post('/invoiceSales', controller.createSalesInvoice)
module.exports = router;
