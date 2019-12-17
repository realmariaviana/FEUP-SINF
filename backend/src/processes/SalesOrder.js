'use strict'

const moment = require('moment');

const create = body => {

    // Product Order
    const { documentLines, company, buyerCustomerParty, id } = body

    const sellerDocument = {
        documentType: 'ECL',
        serie: moment().format('YYYY'),
        documentDate: moment().format(),
        buyerCustomerParty: buyerCustomerParty,
        discount: 0,
        currency: 'EUR',
        paymentMethod: 'NUM',
        company: company,// id dentro de costumer na empresa que cria o SO
        deliveryOnInvoice: false,
        documentLines: documentLines
    }

    return sellerDocument;

}


module.exports = {
    create
}