'use strict'

const mongoose = require('mongoose');

const { Schema } = mongoose;

const companySchema = new Schema({
    numComp: {type: String, required:true},
    compId: {type: String, required:false},
    tenant: {type: String, required:true},
    organization: {type: String, required: true},
    compName: {type: String, required: true}
}, 
{
    timestamps: false,
}
)

const Company = mongoose.model('company', companySchema);

module.exports = Company;
