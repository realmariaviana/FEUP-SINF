const express = require('express');
const router = express.Router();
const controller = require('../../controllers/request')

/* GET companies listing. */
router.get('/', controller.getCompanies);

module.exports = router;
