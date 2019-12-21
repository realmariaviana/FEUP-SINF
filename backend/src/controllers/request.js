'use strict'

const axios = require('axios');
const FormData = require('form-data');

const MasterDataProcesses = require('../models/masterdata')
const Order = require('../models/order')
const SO = require('../processes/SalesOrder')
const Invoice = require('../processes/Invoice')
const Receive = require('../processes/Receive')
const {saveLog} = require('./logsController');



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
        saveLog(err, "GENERAL");
    }
}


const getAllPs = async (tenant, filter) => {

    try {
        const url = `https://my.jasminsoftware.com/api/${tenant}/${tenant + "-0001"}/accountsPayable/payments`

        const payments = await http('get', url)

        if (filter) {
            return payments.data.filter(x => {
                return filter.includes(x.naturalKey)
            })
        } else {
            return payments.data.filter(x => {
                return !x.isDeleted
            })
        }

    } catch (e) {
        const { response } = e
        if (response.status === 401) {
            await requestAccessToken()
            return getAllPs(tenant, filter)

        } else {
            console.log(response)
        }
    }
}


const processP = async (req, res) => {

    try {
        const names = req.body.name
        const tenant = req.body.tenant
        const tenant2 = req.body.tenant2

        let payments;

        if (names)
            payments = await getAllPs(tenant, names)
        else
            payments = await getAllPs(tenant)


        await payments.forEach(payment => createP(payment, tenant2))

        res.json('done')

    } catch (e) {
        console.log(e)
    }

}


const createP = async (payment, tenant) => {

    try {
        const urlCreate = (companyKey) => `https://my.jasminsoftware.com/api/${tenant}/${tenant + "-0001"}/accountsReceivable/processOpenItems/${companyKey}`

        let array = [];
        let fa = '';

        for (let lol of payment.documentLines) {


            const vfa = await Order.findOne({ orderID: lol.sourceDocId })

            if (!vfa) {
                throw ('no vfa')
            }

            const process = await MasterDataProcesses.findOne({ orderId2: vfa.orderID })
            const fa2 = await Order.findOne({ orderID: process.orderId1 })

            fa = fa2.companyKey
            const body = Receive.create(fa2.doc, lol.discountAmount, lol.settledAmount.amount)

            array.push(body)

        }
        console.log(array)

        const kapa = await http('post', urlCreate(fa), array)


    } catch (e) {
        saveLog("No vfa");
    }

}

const getAllSIs = async (tenant, filter) => {

    try {
        const url = `https://my.jasminsoftware.com/api/${tenant}/${tenant + "-0001"}/billing/invoices`

        const invoices = await http('get', url)

        if (filter) {
            return invoices.data.filter(x => {
                return filter.includes(x.naturalKey)
            })
        } else {
            return invoices.data.filter(x => {
                return !x.isDeleted
            })
        }

    } catch (e) {
        const { response } = e
        if (response.status === 401) {
            await requestAccessToken()
            return getAllSIs(tenant, filter)

        } else {
            console.log(response)
        }
    }
}


const processSI = async (req, res) => {

    try {
        const names = req.body.name
        const tenant = req.body.tenant
        const tenant2 = req.body.tenant2

        let invoices;

        if (names)
            invoices = await getAllSIs(tenant, names)
        else
            invoices = await getAllSIs(tenant)


        await invoices.forEach(invoice => createPI(invoice, tenant, tenant2))

        res.json('done')

    } catch (e) {
        console.log(e)
    }

}

// invoice is from tenant 
const createPI = async (invoice, tenant2, tenant) => {

    try {
        const urlCreate = `https://my.jasminsoftware.com/api/${tenant}/${tenant + "-0001"}/invoiceReceipt/invoices`
        const urlCompanies = `https://my.jasminsoftware.com/api/${tenant}/${tenant + "-0001"}/corepatterns/companies`
        const urlSupp = `https://my.jasminsoftware.com/api/${tenant}/${tenant + "-0001"}/purchasesCore/supplierParties`


        const comp = await http('get', urlCompanies)

        const supp = await http('get', urlSupp)


        const company = comp.data.filter(company => {
            if (company.isActive)
                return company.name.toLowerCase() === invoice.buyerCustomerPartyName.toLowerCase()
            else return false
        })[0]

        const supplier = supp.data.filter(company => {
            if (company.isActive)
                return company.name.toLowerCase() === invoice.companyDescription.toLowerCase()
            else return false
        })[0]


        const body = Invoice.create(invoice, company.companyKey, supplier.partyKey)

        const id = await http('post', urlCreate, body)
        console.log(id)

        await new Order({
            doc: invoice.naturalKey,
            tenant: tenant2,
            companyKey: invoice.company,
            orderID: invoice.id,
            typeOrder: invoice.documentType
        }).save()

        saveLog("FA created with order ID" + orderID, companyKey);

        await new Order({
            tenant: tenant,
            companyKey: company.companyKey,
            orderID: id.data,
            typeOrder: 'VFA'
        }).save()
        saveLog("VFA created with order ID" + orderID, companyKey);

        await new MasterDataProcesses({
            orderId1: invoice.id,
            orderId2: id.data
        }).save()
        console.log('MP')
        //// GUARDA NA BASE DE DADOS
    } catch (e) {
        //console.log(e)
    }
}


const getAllDOs = async (tenant, filter) => {
    try {
        const url = `https://my.jasminsoftware.com/api/${tenant}/${tenant + "-0001"}/shipping/deliveries`

        const deliveries = await http('get', url)

        if (filter) {

            return deliveries.data.filter(x => {
                return filter.includes(x.naturalKey)
            })
        }
        else
            return deliveries.data.filter(x => {
                return !x.isDeleted;
            })

    } catch (e) {
        const { response } = e
        if (response.status === 401) {
            await requestAccessToken()
            return getAllDOs(tenant, filter)

        } else {
            console.log(response)
        }
    }
}

const processDOs = async (req, res) => {
    try {
        const names = req.body.name
        const tenant = req.body.tenant
        const tenant2 = req.body.tenant2
        let deliveries;

        if (names)
            deliveries = await getAllDOs(tenant, names)
        else
            deliveries = await getAllDOs(tenant)


        await deliveries.forEach(delivery => createGR(delivery, tenant2))
        //await createGR(deliveries, tenant)

        res.json('done')

    } catch (e) {
        console.log(e)
    }
}

const createGR = async (delivery, tenant) => {
    try {
        let body = []
        let comp = ''
        // const tenant = tenant1 === globla['tenant1'] ? tenant1 : global['tenant2'];
        for (let line of delivery.documentLines) {
            const process = await MasterDataProcesses.findOne({ orderId2: line.sourceDocId })

            if (!process) {
                //throw ('SO NOT CREATED BY me')
                continue
            }

            const order = await Order.findOne({ orderID: process.orderId1 })

            const tmp = await http('get', `https://my.jasminsoftware.com/api/${order.tenant}/${order.tenant + "-0001"}/goodsReceipt/processOrders/1/1000?company=${order.companyKey}`)

            const order2 = tmp.data.filter(x => {
                return x.sourceDocKey === order.doc
            })

            //TODO: LOG

            if (!order2.length) {
                // throw ('NAO TENHO NADA PARA RECEBER')
                continue
            }

            //maybe construir o soucelin e quatity
            order2.forEach(x => {
                body.push({
                    sourceDocKey: order.doc, "SourceDocLineNumber": x.sourceDocLineNumber,
                    "quantity": x.quantity
                })
            })

        }

        if (body.length || comp === '')
            return

        const ans = await http('post', `https://my.jasminsoftware.com/api/${tenant}/${tenant + "-0001"}/goodsreceipt/processOrders/${comp}`, body)

        //  await Order.updateOne({ _id: order._id }, { $set: { "processed": true } })

        await new Order({
            tenant: tenant,
            companyKey: order.companyKey,
            orderID: ans.data,
            processed: false,
            typeOrder: 'GR'
        }).save()

        console.log("GR INSERTED " + ans.data)
        saveLog("GR inserted", order.companyKey);

        await new Order({
            doc: delivery.documentLines[0].sourceDoc,
            tenant: tenant,
            companyKey: delivery.company,
            orderID: delivery.id,
            processed: false,
            typeOrder: 'DO'
        }).save()

        console.log("DO INSERTED " + delivery.id)
        saveLog("DO inserted", delivery.company);

        await new MasterDataProcesses({
            orderId1: delivery.id,
            orderId2: ans.data
        }).save()

        console.log("process INSERTED ");

    } catch (e) {

        console.log(e)

    }

}



// create ONE SO
const createSalesOrder = async (order, tenant1, tenant2) => {

    try {
            console.log(order.naturalKey + " " + order.id) 

        const tenant = tenant1
        //const tenant = tenant1 === globla['tenant1'] ? tenant1 : global['tenant2'];

        const customers = await http('get', `https://my.jasminsoftware.com/api/${tenant}/${tenant + "-0001"}/businesscore/parties`)

        const customer = customers.data.filter(elem => {

            return order.companyDescription === elem.name
        })

        if (!customer.length){
            saveLog("Error: No customer found" , order.company);
            throw ('there are no customer') /// TRHOW LOG NAO HÁ CUSTOMERS
        }


        const ans = await http('get', `https://my.jasminsoftware.com/api/${tenant}/${tenant + "-0001"}/corepatterns/companies`)

        const comp = ans.data.filter(company => {

            if (company.isActive)
                return company.name.toLowerCase() === order.sellerSupplierPartyName.toLowerCase()
            else return false
        })

        let goods = [];

        order.documentLines.forEach(x => goods.push({ salesItem: x.purchasesItem, quantity: x.quantity, unit: x.unit, unitPrice: x.unitPrice }));
        const k = SO.create({
            paymentMethod: order.paymentMethod,
            discount: order.discount,
            currency: order.currency,
            documentLines: goods,
            buyerCustomerParty: customer[0].partyKey,
            company: comp[0].companyKey

        })

        await new Order({
            doc: order.naturalKey,
            tenant: tenant2,
            companyKey: order.company,
            orderID: order.id,
            typeOrder: 'PO'
        }).save()

        console.log('inserted PO with ' + order.id)
        saveLog("Success: Inserted PO with id: " + order.id, order.company);

        const ans2 = await http('post', `https://my.jasminsoftware.com/api/${tenant}/${tenant + "-0001"}/sales/orders`, k)

        await new Order({
            tenant: tenant,
            companyKey: k.company,
            orderID: ans2.data,
            typeOrder: 'SO'
        }).save()

        console.log('inserted SO with ' + ans.data)
        saveLog("Success: Inserted SO with id: " + ans2.data);

        await new MasterDataProcesses({
            orderId1: order.id,
            orderId2: ans2.data
        }).save()
        console.log('inserted processes: ' + order.id + " and " + ans2.data)
        saveLog("Success: Inserted process in database PO: " + order.id + " and SO: " + ans2.data);

    } catch (e) {
        console.log(e)
        

        // DAR HANDLE AOS DOIS ERROS QUE PODEM ACONTECER
        // E DAR LOG DELES

        // console.log(e) // INSERT LOG "ECOMENDA ALREADY PROCESSED"// DAR HANDLE AOS DOIS ERROS QUE PODEM ACONTECER
        // E DAR LOG DELES

        // console.log(e) // INSERT LOG "ECOMENDA ALREADY PROCESSED"
    }

}

const processPos = async (req, res) => {

    const names = req.body.names
    const tenant = req.body.tenant
    const tenant2 = req.body.tenant2

    let orders;
    try {
        if (names)
            orders = await getAllPOs(tenant, names)
        else
            orders = await getAllPOs(tenant)

        orders.forEach(order => createSalesOrder(order, tenant2, tenant))

        res.status(200).json('done')

    } catch (e) {
        console.log(e)
    }
}

const getAllPOs = async (tenant, filter) => {

    try {
        const url = `https://my.jasminsoftware.com/api/${tenant}/${tenant + "-0001"}/purchases/orders`

        const tmpOrders = await http('get', url);

        if (filter) {
            return await tmpOrders.data.filter(async order => {
                return filter.includes(order.naturalKey)
            })
        }
        else {
            return await tmpOrders.data.filter((order) => {
                return (/ECF.*/.test(order.naturalKey) && !order.isDeleted)
            })

        }
    } catch (e) {
        const { response } = e
        if (response.status === 401) {
            await requestAccessToken()
            return getAllPOs(tenant, filter)

        } else {
            console.log('mummy')
        }
    }

}

module.exports = {
    http,
    requestAccessToken,
    processPos,
    processDOs,
    processSI,
    processP, 

}