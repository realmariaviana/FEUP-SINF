'use strict'

const axios = require('axios');
const Company = require('../models/company');
const {http, requestAccessToken} = require('./request');

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

const saveTenantOrganization = (req, res) => {

    //  TODO: check if its only digits
    /* if(false) {   // if not valid
        res.status(500).send({ error: 'not valid tenant or organization' })
    } */
    
    global["tenant1"] = req.headers.tenant;
    global["tenant2"] = req.headers.tenant2;
    global["organization1"] = req.headers.organization;
    global["organization2"] = req.headers.organization2;

    console.log("Received and saved in global <tenant1> and <tenant2>: " + req.headers.tenant + ", " + req.headers.tenant2);
    console.log("Received and saved in global <organization1> and <organization2>: " + req.headers.organization + ", " + req.headers.organization2);

    res.send({ message: "Saved tenants and organizations successfully"});

}

const getPurchaseOrders = (req, res) => {

    console.log("Company_Controller: Getting purchase orders");
    
    console.log(global["tenant1"]);
    console.log(global["organization1"]);

    const url = `https://my.jasminsoftware.com/api/${global["tenant1"]}/${global["organization1"]}/purchases/orders?`

    http('get', url)
        .then(answer => {
            const POs = answer.data
            console.log("Received purchase orders for organization " + global["organization1"] + ':');
            console.log(POs)
            res.send(POs)
        })
        .catch(respo => {
            const { response } = respo
            if (response.status === 401) {
                requestAccessToken()        // Necessario estar sempre a fazer o pedido do token?
                    .then(() => getPurchaseOrders(req, res))
                    .catch(error => console.log(error))
            }
        })
    
}

module.exports = {
    getCompanies,
    getPurchaseOrders,
    saveTenantOrganization
}