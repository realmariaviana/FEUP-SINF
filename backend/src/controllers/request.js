'use strict'

const axios = require('axios');
const FormData = require('form-data');

const MasterDataProcesses = require('../models/masterdata')
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

    console.log("globalll");
    console.log(global['FEUP-SINF-Q']);
    const defaultHeader = {
        Authorization: "Bearer " + global['FEUP-SINF-Q'],
        "Content-Type": "application/json",
    }

    const headers = header ? { ...defaultHeader, ...header } : defaultHeader;

    // console.log("Sending request to: ");
    // console.log(url);
    // console.log(method);
    // console.log(data);
    // console.log(headers);

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



const createReceiptInvoice = (req, res) => {



}



const createSalesInvoice = (req, res) => {

    const tenant = req.body.tenant
    const doc = req.body.doc

    const url = `https://my.jasminsoftware.com/api/${tenant}/${tenant + "-0001"}/billing/processOrders/1/1000`

    http('get', url)
        .then(sales => {
            const sale = sales.data.filter(x => x.orderKey === doc)[0]

            const body = [
                {
                    "deliveryKey": sale.deliveryKey,
                    "deliveryLineNumber": sale.deliveryLineNumber,
                    "orderKey": sale.orderKey,
                    "orderLineNumber": sale.orderLineNumber,
                    "quantity": sale.openQuantity
                }
            ]

            http('get', `https://my.jasminsoftware.com/api/${tenant}/${tenant + "-0001"}/shipping/deliveries`)
                .then(answer => {

                    const deliveryOrder = answer.data.filter(x => x.documentLines[0].sourceDoc === doc)

                    http('post', `https://my.jasminsoftware.com/api/${tenant}/${tenant + "-0001"}billing/processOrders/${deliveryOrder[0].company}`, body)
                        .then(an => res.json(an.data))
                        .catch(err => console.log('oi'))
                })
                .catch(err => console.log(err))

        }).catch(respo => {
            const { response } = respo
            if (response.status === 401) {
                requestAccessToken()
                    .then(() => createSalesInvoice(req, res))
                    .catch(error => console.log(error))
            } else {
                console.log(response)
            }
        })

}


const getAllDOs = async (tenant, filter) => {
    try {
        const url = `https://my.jasminsoftware.com/api/${tenant}/${tenant + "-0001"}/shipping/deliveries`

        const deliveries = await http('get', url)

        if (filter) {

            return deliveries.data.filter(x => {
                return filter.contains(x.naturalKey)
            })
        }
        else
            return deliveries.data

    } catch (e) {
        const { response } = e
        if (response.status === 401) {
            requestAccessToken()
                .then(() => getAllDOs(tenant, filter))
                .catch(error => console.log(error))
        } else {
            console.log(response)
        }
    }
}

const createGR = async (delivery) => {
    try {
        // const tenant = tenant1 === globla['tenant1'] ? tenant1 : global['tenant2'];

        const process = await MasterDataProcesses.findOne({ orderId2: delivery.documentLines[0].sourceDocId })

        const order = await Order.findOne({ orderID: process.orderId1 })

        const ans = await http('post', `https://my.jasminsoftware.com/api/${order.tenant}/${order.tenant + "-0001"}/goodsreceipt/processOrders/${order.companyKey}`, [{
            sourceDocKey: order.doc, "SourceDocLineNumber": 1,
            "quantity": 1
        }])

        Order.update({ _id: order._id }, { $set: { "processed": true } })

        await new Order({
            tenant: order.tenant,
            companyKey: order.companyKey,
            orderID: ans.data,
            processed: false,
            typeOrder: 'GR'
        }).save()


        await new Order({
            doc: delivery.documentLines[0].sourceDoc,
            tenant: tenant,
            companyKey: delivery.company,
            orderID: delivery.id,
            processed: false,
            typeOrder: 'DO'
        }).save()

        await new MasterDataProcesses({
            orderId1: delivery.id,
            orderId2: ans.data
        }).save()

    } catch (e) {

        console.log(e)

    }

}

const processDOs = async (req, res) => {
    try {
        const names = req.body.name
        const tenant = req.body.tenant
        let deliveries;

        if (names)
            deliveries = getAllDOs(tenant, names)
        else
            deliveries = getAllDOs(tenant)

       await deliveries.forEach(delivery => createGR(delivery))

        res.json('done')
        // Promise.all(prom)
    } catch (e) {
        console.log(e)
    }
}

const createSalesOrder = async (order, tenant1) => {

    try {

        const tenant = tenant1 === globla['tenant1'] ? tenant1 : global['tenant2'];

        const customers = await http('get', `https://my.jasminsoftware.com/api/${tenant}/${tenant + "-0001"}/businesscore/parties`)

        const customer = customers.data.filter(elem => {
            return order.companyDescription === elem.name
        })

        const ans = http('get', `https://my.jasminsoftware.com/api/${tenant}/${tenant + "-0001"}/corepatterns/companies`)

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

        const ans2 = await http('post', `https://my.jasminsoftware.com/api/${tenant}/${tenant + "-0001"}/sales/orders`, k)

        await new Order({
            doc: order.naturalKey,
            tenant: tenant,
            companyKey: order.company,
            orderID: order.id,
            typeOrder: 'PO'
        }).save()

        console.log('inserted PO with ' + order.id)

        await new Order({
            tenant: tenant2,
            companyKey: k.company,
            orderID: ans2.data,
            typeOrder: 'SO'
        }).save()

        console.log('inserted SO with ' + ans.data)

        await new MasterDataProcesses({
            orderId1: order.id,
            orderId2: ans2.data
        }).save()
        console.log('inserted processes: ' + order.id + " and " + ans2.data)

    } catch (e) {
        console.log(e)
    }

}


const processPos = async (req, res) => {
    const names = req.body.names
    const tenant = req.body.tenant

    let orders;

    if (names)
        orders = getAllPOs(tenant, names)
    else
        orders = getAllPOs(tenant)


   await orders.forEach(order => createSalesOrder(order, tenant))

    res.json('done')
}

const getAllPOs = async (tenant, filter) => {

    try {
        const url = `https://my.jasminsoftware.com/api/${tenant}/${tenant + "-0001"}/purchases/orders?`

        const tmpOrders = await http('get', url);

        if (filter) {

            return tmpOrders.data.filter(order => {
                return filter.contains(order.naturalKey)
            })
        }
        else {
            return tmpOrders.data.filter(order => {
                return /ECF.*/.test(order.naturalKey) && !order.isDeleted
            })
        }

    } catch (e) {
        const { response } = e
        if (response.status === 401) {
            requestAccessToken()
                .then(() => getAllPOs(tenant, filter))
                .catch(error => console.log(error))
        } else {
            console.log(response)
        }
    }

}

module.exports = {
    http,
    requestAccessToken,
    processPos,
    processDOs
}