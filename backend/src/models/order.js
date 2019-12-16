'use strict'

const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
    doc: { type: String },
    tenant: { type: String, required: true },
    companyKey: { type: String, required: true },
    orderID: { type: String, required: true, unique: true },
    processed: { type: Boolean, default: false },
    typeOrder: { type: String, required: true },
},
    {
        timestamps: true,
    })

//orderSchema.createIndex({ orderID: 1 }, { unique: true })


const Order = mongoose.model('order', orderSchema);

module.exports = Order;