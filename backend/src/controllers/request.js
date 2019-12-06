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

const http = (method, url, data) => {
    const bodyData = getBodyData(data);

    return axios({
        baseURL: url,
        method: method,
        data: bodyData,
        headers: { ...bodyData.getHeaders() }
    });
};

// receive client_id and client_secret
const requestAccessToken = async (req, res) => {

    const client_id = req.body.client_id
    const client_secret = req.body.client_secret

    const bodyData = {
        client_id: client_id,
        client_secret: client_secret,
        grant_type: 'client_credentials',
        scope: 'application',
    };

    const url = 'https://identity.primaverabss.com/connect/token'

    const answer = await http('post', url, bodyData);

    global.client_id.token = answer.data;
    res.json(answer.data)
}





module.exports = {
    requestAccessToken
}