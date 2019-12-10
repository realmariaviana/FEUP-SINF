'user strict'

const mongoose = require('mongoose');

const { Schema } = mongoose;


const logSchema = new Schema( {
    date: {type: Date, required: true}, 
    message : {type: String, required: true},
    compID: {type: String, required: true}
}, 
{
    timestamps: true,
})


