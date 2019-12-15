const express = require('express');
const router = express.Router();
const controller = require('../../controllers/logsController')



/**
 * Create new Company
 */
router.get('/logs', controller.listLogs);

module.exports = router;