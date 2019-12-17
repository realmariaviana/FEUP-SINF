'use strict'

const moment = require('moment');

const create = body => {

    // Product Order
    const { documentLines, company, discount, buyerCustomerParty, currency, paymentMethod } = body

    const sellerDocument = {
        documentType: 'ECL',
        serie: moment().format('YYYY'),
        documentDate: moment().format(),
        buyerCustomerParty: buyerCustomerParty,
        discount: discount,
        currency: currency,
        paymentMethod: paymentMethod,
        company: company,// id dentro de costumer na empresa que cria o SO
        deliveryOnInvoice: false,
        documentLines: documentLines
    }

    return sellerDocument;

}


module.exports = {
    create
}