'use strict'

const Log = require('../models/logs')

const listLogs = (req, res) => {
    Log.find({})
    .then(logs => {
        res.send(logs);
    })
    .catch(error => {console.log(error)});
}

module.exports = {
    listLogs
}

