'use strict'

const Log = require('../models/logs')


const saveLog = async (stringlog, companyID) => {
    await new Log({
        message: stringlog,
        compId: companyID
    }).save();
}

const listLogs = async (req, res) => {
    Log.find({}).sort('-createdAt')
        .then(logs => {
            let kapa = logs.map(x => [x.compId, x.message, new Date(x.createdAt).toGMTString()])
            res.send(kapa);
        })
        .catch(error => { console.log(error) });
}

module.exports = {
    listLogs,
    saveLog
}

