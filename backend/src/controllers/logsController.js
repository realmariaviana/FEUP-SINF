'use strict'

const LogModel = require('../models/logs')

const listLogs = (req, res) => {
    console.log(LogModel.find().size);
}

module.exports = {
    listLogs
}

