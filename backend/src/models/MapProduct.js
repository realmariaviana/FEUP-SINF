'user strict'

const mongoose = require('mongoose');

const { Schema } = mongoose;


const mapproductSchema = new Schema( {
    product1 : {type: String, required: true},
    product2: {type: String, required: true}
}, 
{
    timestamps: false,
})


const Log = mongoose.model('mapentry', mapproductSchema)

module.exports = Log