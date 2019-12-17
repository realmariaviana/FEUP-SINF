const express = require('express');
const router = express.Router();
const controller = require('../../controllers/companyController')

/* GET companies listing. */
router.get('/', controller.getCompanies);

/* GET Purchase Orders listing. */
router.get('/purchase_orders', controller.getPurchaseOrders);
router.get('/company_itens', controller.getItens);
/**
 * Create new Company
 */
router.get('/company', controller.getCompaniesInfo);

/**
 * Create new Company
 */
router.post('/company', controller.saveTenantOrganization);

/**
 * Create mapped products entry
 */
router.post('/map', controller.createMapEntry);

module.exports = router;
