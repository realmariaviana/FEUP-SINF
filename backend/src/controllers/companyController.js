'use strict'

const axios = require('axios');
const Company = require('../models/company');
const controllRequest = require('./request')
const MapProduct = require('../models/MapProduct');
const { http, requestAccessToken } = require('./request');

const getCompanies = (req, res) => {

    const tenant = req.headers.tenant;

    const url = `https://my.jasminsoftware.com/api/${tenant}/${tenant + "-0001"}/corepatterns/companies`

    http('get', url)
        .then(answer => {
            const companies = answer.data
            res.send(companies)
        })
        .catch(respo => {
            const { response } = respo
            if (response.status === 401) {
                requestAccessToken()        // Necessario estar sempre a fazer o pedido do token?
                    .then(() => getCompanies(req, res))
                    .catch(error => console.log(error))
            }
        })
}

const getCompaniesInfo = (req, res) => {
    console.log("getCompaniesInfo: ");
    Company.find()
        .then(companies => {
            let cenas = companies.map(x => [x.tenant, x.organization, x.compName]);
            res.json(cenas);
        })
        ;

}

const saveTenantOrganization = (req, res) => {

    try {
        //  TODO: check if its only digits
        /* if(false) {   // if not valid
            res.status(500).send({ error: 'not valid tenant or organization' })
        } */

        const tenant = req.headers.tenant;
        const tenant2 = req.headers.tenant2;
        const organization = req.headers.organization;
        const organization2 = req.headers.organization2;

        global['tenant1'] = tenant
        global['tenant2'] = tenant2
        global['org1'] = organization
        global['org2'] = organization2

        const url = `https://my.jasminsoftware.com/api/${tenant}/${organization}/corepatterns/companies`;
        const url2 = `https://my.jasminsoftware.com/api/${tenant2}/${organization2}/corepatterns/companies`;

        http('get', url)
            .then(answer => {
                const companies = answer.data
                http('get', url2)
                    .then(answer2 => {
                        const companies2 = answer2.data
                        saveTenantOrganizationDB(tenant, organization, tenant2, organization2, companies[1].companyKey, companies2[1].companyKey);
                        res.send({ company1: companies[1].companyKey, company2: companies2[1].companyKey })
                    })
                    .catch(respo => {
                        const { response } = respo
                        if (response.status === 401) {

                            requestAccessToken()        // Necessario estar sempre a fazer o pedido do token?
                                .then(() => saveTenantOrganization(req, res))
                                .catch(error => {

                                    console.log(error)
                                })
                        }
                        console.log(respo)
                    })
            })
            .catch(respo => {
                const { response } = respo
                if (response.status === 401) {

                    requestAccessToken()        // Necessario estar sempre a fazer o pedido do token?
                        .then(() => saveTenantOrganization(req, res))
                        .catch(error => {


                            //                            console.log(error)
                        })
                }

                // console.log(respo)

            })

        //console.log(Company.find());

        /* global["tenant1"] = req.headers.tenant;
        global["tenant2"] = req.headers.tenant2;
        global["organization1"] = req.headers.organization;
        global["organization2"] = req.headers.organization2; */

        setTimers();
        console.log("Received and saved in global <tenant1> and <tenant2>: " + req.headers.tenant + ", " + req.headers.tenant2);
        console.log("Received and saved in global <organization1> and <organization2>: " + req.headers.organization + ", " + req.headers.organization2);

        //res.send({ message: "Saved tenants and organizations successfully"});
    } catch (e) {
        console.log(e)
    }
}



function setTimers() {

    //setInterval(() => { controllRequest.processPos(global['tenant1']) }, 15000)
    setInterval(() => { controllRequest.processDOs(global['tenant2']) }, 5000)


}



const saveTenantOrganizationDB = (tenant, organization, tenant2, organization2, company_name, company_name2) => {

    Company.deleteMany({})
        .then(ans => { })
        .catch(err => {

            console.log(err)
        });

    new Company({ numComp: 1, tenant: tenant, organization: organization, compName: company_name })
        .save()
        .then(ans => { console.log(ans) })
        .catch(err => {
            console.log(err)
        });


    new Company({ numComp: 2, tenant: tenant2, organization: organization2, compName: company_name2 })
        .save()
        .then(ans => { console.log(ans) })
        .catch(err => {

            console.log(err)
        })


}

const getPurchaseOrders = (req, res) => {

    console.log("Company_Controller: Getting purchase orders");
    console.log(req.headers.organization);

    const url = `https://my.jasminsoftware.com/api/${req.headers.tenant}/${req.headers.organization}/purchases/orders?page=1&pageSize=100`

    http('get', url)
        .then(answer => {
            const POs = answer.data.data
            console.log("Sending info from organization: " + req.headers.organization);
            res.send(POs)
        })
        .catch(respo => {
            const { response } = respo
            if (response.status === 401) {
                requestAccessToken()        // Necessario estar sempre a fazer o pedido do token?
                    .then(() => getPurchaseOrders(req, res))
                    .catch(error => console.log(error))
            }
        })

}

const getItens = (req, res) => {
    Company.find({ numComp: '1' }).then(company1 => {
        let tenant1 = company1[0].tenant;
        let organization1 = company1[0].organization;
        let name1 = company1[0].compName;
        Company.find({ numComp: '2' }).then(company2 => {
            let tenant2 = company2[0].tenant;
            let organization2 = company2[0].organization;
            let name2 = company2[0].compName;
            const url = `https://my.jasminsoftware.com/api/${tenant1}/${organization1}/salescore/salesitems`;
            let returnResp;
            let returnResp1;
            http('get', url)
                .then(answer => {
                    const url = `https://my.jasminsoftware.com/api/${tenant1}/${organization1}/purchasesCore/purchasesitems`
                    http('get', url)
                        .then(answer1 => {
                            const ans = answer.data
                            const ans1 = answer1.data
                            returnResp = [ans.map(x => [x.itemKey, x.description, 'sales'])];
                            returnResp = returnResp.concat([ans1.map(x => [x.itemKey, x.description, 'purchase'])]);
                            const url = `https://my.jasminsoftware.com/api/${tenant2}/${organization2}/salescore/salesitems`;
                            http('get', url)
                                .then(answer => {
                                    const url = `https://my.jasminsoftware.com/api/${tenant2}/${organization2}/purchasesCore/purchasesitems`
                                    http('get', url)
                                        .then(answer1 => {
                                            const ans = answer.data
                                            const ans1 = answer1.data
                                            returnResp1 = [ans.map(x => [x.itemKey, x.description, 'sales'])];
                                            returnResp1 = returnResp1.concat([ans1.map(x => [x.itemKey, x.description, 'purchase'])]);
                                            let rp = [name1].concat([returnResp]).concat([name2]).concat([returnResp1]);
                                            res.json(rp);
                                        })
                                })
                        })


                })
                .catch(respo => {
                    const { response } = respo
                    if (response.status === 401) {
                        requestAccessToken()        // Necessario estar sempre a fazer o pedido do token?
                            .then(() => getItens(req, res))
                            .catch(error => console.log(error))
                    }
                })
        })
    })
        .catch(error => console.log(error));

}

const createMapEntry = async (req, res) => {
    console.log("Creating product map entry");
    const entry = new MapProduct({ product1: req.headers.product1, product2: req.headers.product2 });

    entry.save(async (err, data) => {
        if (err)
            console.log(err);
        let cena = await getMapEntry(req.headers.product1, "sale");
        res.status(200);
    });
}

const getMapEntry = async (productId, type) => {
    if (type == "sale") {
        return await MapProduct.findOne({ product1: productId });
    }
    else {
        return await MapProduct.findOne({ product2: productId });
    }

}

module.exports = {
    getCompanies,
    createMapEntry,
    getPurchaseOrders,
    saveTenantOrganization,
    getCompaniesInfo,
    getItens,
    getMapEntry
}