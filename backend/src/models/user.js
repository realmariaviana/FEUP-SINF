'use strict'

const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    client_id: {type:String, required: true},
    client_secret: {type: String, required: true}
}, 
{
    timestamps: true,
}
)


const User = mongoose.model('user', userSchema);
module.exports = User;
