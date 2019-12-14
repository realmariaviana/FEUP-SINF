'use strict'

const axios = require('axios');
const controller = require('./request');
const Company = require('../models/company');

const getCompanies = (req, res) => {

    const tenant = req.headers.tenant;

    const url = `https://my.jasminsoftware.com/api/${tenant}/${tenant + "-0001"}/corepatterns/companies`

    http('get', url)
        .then(answer => {
            const companies = answer.data
            console.log(companies)
            res.send(companies)
        })
        .catch(respo => {
            const { response } = respo
            if (response.status === 401) {
                requestAccessToken()        // Necessario estar sempre a fazer o pedido do token?
                    .then(() => getCompanies(req, res))
                    .catch(error => console.log(error))
            }

        })
}

const createCompany = (req, res) => {
    
    console.log("Creating company:");
    console.log(req.headers.tenant);
    console.log(req.headers.organization);

    //  TODO: check if its only digits
    
    const company = new Company({ tenant: req.tenant, organization: req.organization });
    company.save()
    .then(item => {
        console.log("moo model company");
      res.send("item saved to database");
    })
    .catch(err => {
        console.log("eated model company");
      res.status(400).send("unable to save to database");
    });
    /* Company.find(query, (err, result) => {
        console.log(err);
    }); */
}

module.exports = {
    getCompanies,
    createCompany
}