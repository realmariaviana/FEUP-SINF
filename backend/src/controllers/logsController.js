'use strict'

const Log = require('../models/logs')

const listLogs = (req, res) => {
    Log.find({})
        .then(logs => {
            let kapa = logs.map(x => [x.compId, x.message, new Date(x.createdAt).toGMTString()])
            res.send(kapa);
        })
        .catch(error => { console.log(error) });
}

module.exports = {
    listLogs
}

