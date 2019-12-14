const mongoose = require('mongoose')

const { Schema } = mongoose

const supplierSchema = new Schema({
    compoId: {type: String, required: true},
    supplierKey: {type: String, required: true},
    supplierName: {type: String, required: true}

})

const Supplier = mongoose.model('supplier', supplierSchema);

module.exports = Supplier;