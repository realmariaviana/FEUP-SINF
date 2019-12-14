'use stric'

const mongoose = require('mongoose')

const { Schema } = mongoose

const costumerSchema = new Schema({
    compId: {type: String, required: true},
    costumerKey: {type: String, required: true},
    costumerName: {type: String, required: true}
})

const Costumer = mongoose.model('costumer', costumerSchema)

module.exports = Costumer;