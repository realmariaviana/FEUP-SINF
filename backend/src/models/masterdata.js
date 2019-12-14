'use strict'

const mongoose = require('mongoose')
const type = require('./order')

const { Schema } = mongoose;

const masterDataCompanies = new Schema({

    name: {type: String, required: true},
    supplierTenant: {type: String, required: true},
    supplierId: {type: String, required: true},
    customerTenant: {type: String, required: true},
    customerId: {type: String, required: true}

})



const MasterDataCompanies = mongoose.model('data_companies', masterDataCompanies);

module.exports = MasterDataCompanies