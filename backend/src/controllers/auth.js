'use strict'

const axios = require('axios');

const User = require('../models/User')


const add = (req, res) => {

    if (req.body.email &&
        req.body.username &&
        req.body.password) {
        var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        }
        //use schema.create to insert data into the db
        User.create(userData, function (err, user) {
            if (err) {
                return next(err)
            } else {
                return res.redirect('/admin/settings');
            }
        });
    }

}