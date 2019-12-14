'use strict'

const mongoose = require('mongoose');

const { Schema } = mongoose;

const companySchema = new Schema({
    tenant: {type: String, required:true},
    organization: {type: String, required: true},
    compId: {type: String, required: true},
    compName: {type: String, required: true}
}, 
{
    timestamps: true,
}
)

const Company = mongoose.model('company', companySchema);
module.exports = Company;
