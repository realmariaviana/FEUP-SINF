'user strict'

const mongoose = require('mongoose');

const { Schema } = mongoose;


const logSchema = new Schema( {
    message : {type: String, required: true},
    compId: {type: String, required: true}
}, 
{
    timestamps: true,
})


const Log = mongoose.model('log', logSchema)

module.exports = Log

