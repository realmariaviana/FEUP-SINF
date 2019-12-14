const express = require('express');
const router = express.Router();
const controller = require('../../controllers/company')

/* GET companies listing. */
router.get('/', controller.getCompanies);

/**
 * Create new Company
 */
router.post('/company', controller.createCompany);

module.exports = router;
