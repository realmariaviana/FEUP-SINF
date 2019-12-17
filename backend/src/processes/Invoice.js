'use strict'

const moment = require('moment');

const create = (body, company, seller) => {

    

    const line = body.documentLines.map(item => {
        return {
            PurchasesItem: item.salesItem,
            quantity: item.quantity,
            unitPrice: item.unitPrice
        }
    })

    const invoice = {
        documentType: 'VFA',
        serie: moment().format('YYYY'),
        documentDate: moment().format(),
        company: company,// id dentro de costumer na empresa que cria o SO
        documentLines: line,
        paymentTerm: body.paymentTerm,
        paymentMethod: body.paymentMethod,
        sellerSupplierParty: seller,
        exchangeRate: body.exchangeRate,
        discount: body.discount,
        loadingCountry: body.loadingCountry,
        unloadingCountry: body.loadingCountry,
        deliveryTerm: body.deliveryTerm
    }

    return invoice;

}





module.exports = {
    create
}