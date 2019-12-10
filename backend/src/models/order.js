'use strict'

const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({

    orderID: {type: String, required:true},
    procesed: {type: Boolean, default: false},
    compId: {type: String, required: true}
}, 
{
    timestamps: true,
})


const Order = mongoose.model('order', orderSchema);

module.exports = Order;