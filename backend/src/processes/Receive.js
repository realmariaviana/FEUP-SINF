'use strict'

const moment = require('moment');

const create = (sourceDoc, discount, settled) => {

    // const line = body.documentLines.map(item => {
    //     return {
    //         PurchasesItem: item.salesItem,
    //         quantity: item.quantity,
    //         unitPrice: item.unitPrice
    //     }
    // })

    const receive = {
        sourceDoc: sourceDoc,
        discount: discount,
        "settled": settled
    }

    return receive;

}





module.exports = {
    create
}