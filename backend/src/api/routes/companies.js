const express = require('express');
const router = express.Router();
const controller = require('../../controllers/companyController')

/* GET companies listing. */
router.get('/', controller.getCompanies);

/* GET Purchase Orders listing. */
router.get('/purchase_orders', controller.getPurchaseOrders);

/**
 * Create new Company
 */
router.get('/company', controller.getTenantOrganization);

/**
 * Create new Company
 */
router.post('/company', controller.saveTenantOrganization);

module.exports = router;
