'use strict'

const axios = require('axios');
const FormData = require('form-data');


const getBodyData = (formObj) => {
    const bodyData = new FormData()
    for (const key in formObj) {
        bodyData.append(key, formObj[key])
    }
    return bodyData;
};

const http = (method, url, headers, data) => {
    return axios({
        baseURL: url,
        method: method,
        data: data,
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

        res.json(answer.data)

    } catch (err) {
        res.json(err)
    }
}

const getOrders = async (req, res) => {

    const tenant = req.body.tenant;


    console.log(tenant)
    console.log(global['FEUP-SINF-Q'])
    const org = "226335";
    const url = `https://my.jasminsoftware.com/api/${tenant}/${tenant + "-0001"}/purchases/orders?`
    const headers = {
        Authorization: "Bearer " + global['FEUP-SINF-Q'],
        "Content-Type": "application/json",
    }

    const pedido = await axios.get(url, {headers: headers})  
    const orders = pedido.data.filter(order => /ECF.*/.test(order.naturalKey))
    res.json(orders)

}



module.exports = {
    requestAccessToken,
    getOrders
}