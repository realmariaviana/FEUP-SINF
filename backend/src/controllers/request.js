'use strict'

const axios = require('axios');
const FormData = require('form-data');

const MasterDataCompanies = require('../models/masterdata')
const Order = require('../models/order')
const SO = require('../processes/SalesOrder')


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
const requestAccessToken = async () => {
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

const getOrders = async (req, res) => {

    const tenant = req.body.tenant;
    const tenant2 = req.body.other;

    const url = `https://my.jasminsoftware.com/api/${tenant}/${tenant + "-0001"}/purchases/orders?`

    http('get', url)
        .then(answer => {
            const orders = answer.data.filter(order => {
                return /ECF.*/.test(order.naturalKey) && !order.isDeleted
            })

            const order = orders[0];
            http('get', `https://my.jasminsoftware.com/api/${tenant2}/${tenant2 + "-0001"}/businesscore/parties`)
                .then(customers => {

                    const customer = customers.data.filter(elem => {
                        return order.companyDescription === elem.name
                    })

                    http('get', `https://my.jasminsoftware.com/api/${tenant2}/${tenant2 + "-0001"}/corepatterns/companies`)
                        .then(ans => {

                            const comp = ans.data.filter(company => {

                                if (company.isActive)
                                    return company.name.toLowerCase() === order.sellerSupplierPartyName.toLowerCase()
                                else return false
                            })

                            let goods = [];
                            order.documentLines.forEach(x => goods.push({ salesItem: x.purchasesItem }));

                            const k = SO.create({
                                documentLines: goods,
                                buyerCustomerParty: customer[0].partyKey,
                                company: comp[0].companyKey

                            })

                            http('post', `https://my.jasminsoftware.com/api/${tenant2}/${tenant2 + "-0001"}/sales/orders`, k).then(ans => res.json(ans)).catch(err => res.json(err))

                        }).catch(error => console.log(error))

                })
                .catch(erro2 => console.log(erro2))


        })
        .catch(respo => {
            const { response } = respo
            if (response.status === 401) {
                requestAccessToken()
                    .then(() => getOrders(req, res))
                    .catch(error => console.log(error))
            } else {
                console.log(response)
            }

        })
}


module.exports = {
    requestAccessToken,
    getOrders
}