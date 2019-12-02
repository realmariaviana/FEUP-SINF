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

    res.json(answer.data)
}


module.exports = {
    requestAccessToken
}