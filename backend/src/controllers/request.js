'use strict'

const axios = require('axios');
const FormData = require('form-data');
const moment = require('moment');
const Company = require('../models/company')
const Order = require('../models/order')
const Log = require('../models/logs')


const getBodyData = (formObj) => {
    const bodyData = new FormData()
    for (const key in formObj) {
        bodyData.append(key, formObj[key])
    }
    return bodyData;
};

const http = (method, url, data, header) => {

    const defaultHeader = {
        Authorization: "Bearer " + global['FEUP-SINF-Q'],
        "Content-Type": "application/json",
    }

    const headers = header ? { ...defaultHeader, ...header } : defaultHeader;

    console.log("Sending request to: ");
    console.log(url);
    console.log(method);
    console.log(data);
    console.log(headers);
    
    if (data)
        return axios({
            baseURL: url,
            method: method,
            data: data,
            headers: headers
        });
    else return axios({
        baseURL: url,
        method: method,
        headers: headers
    });

};

// receive client_id and client_secret
const requestAccessToken = async (req, res) => {

    const url = 'https://identity.primaverabss.com/connect/token'
    const client_id = 'FEUP-SINF-Q'
    const client_secret = 'd2b94144-8623-4c47-b34e-68912113dbc9'

    const bodyData = {
        client_id: client_id,
        client_secret: client_secret,
        grant_type: 'client_credentials',
        scope: 'application',
    };

    const header = getBodyData(bodyData)
    
    try {
        const answer = await axios({
            baseURL: url,
            method: 'post',
            data: header,
            headers: { ...header.getHeaders() }
        });

        global[client_id] = answer.data.access_token

    } catch (err) {
        console.log(err)
    }
}

const getOrders = (req, res) => {

    const tenant = req.body.tenant;

    const url = `https://my.jasminsoftware.com/api/${tenant}/${tenant + "-0001"}/purchases/orders?`

    http('get', url)
        .then(answer => {
            const orders = answer.data.filter(order => /ECF.*/.test(order.naturalKey))

            res.json(orders)
        })
        .catch(respo => {
            const { response } = respo
            if (response.status === 401) {
                requestAccessToken()
                    .then(() => getOrders(req, res))
                    .catch(error => console.log(error))
            }

        })
}

const createSalesOrder = async (req, res) => {
    try {
        const tenant = req.body.tenant
        const url = `https://my.jasminsoftware.com/api/${tenant}/${tenant + "-0001"}/sales/orders`

        const headers = {
            Authorization: "Bearer " + global['FEUP-SINF-Q'],
            "Content-Type": "application/json",
        }

        const body = {
            documentType: 'ECL',
            serie: moment().format('YYYY'),
            documentDate: moment().format(),
            buyerCustomerParty: '0001',
            discount: 0,
            currency: 'EUR',
            paymentMethod: 'NUM',
            company: 'SINF-Q',
            deliveryOnInvoice: false,
            documentType: {

            }
        }

        const ask = await axios.post(url, { headers: headers, data: body })

        res.json(ask.data)
    } catch (err) {
        console.log(err)
        if (err.status === 401) {
            requestAccessToken();
        } else {
            res.json(err.data)
        }
    }
}

module.exports = {
    requestAccessToken,
    getOrders,
    createSalesOrder
}