'use strict'

const mongoose = require('mongoose')
const type = require('./order')

const { Schema } = mongoose;

const MasterDataProcessesSchema = new Schema({

    orderId1: {type: String, required: true},
    orderId2: {type: String, required: true}


})



const MasterDataProcesses = mongoose.model('data_processes', MasterDataProcessesSchema);

module.exports = MasterDataProcesses