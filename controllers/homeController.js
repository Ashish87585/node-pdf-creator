const fs = require('fs')
const pdf = require('pdf-creator-node')
const path = require('path')
const data = require('../helper/data')
const option = require('../helper/option')


const homeView = (req, res, next) => {
    res.render('home')
}

const generatePdf = async (req, res, next) => {
    const html = fs.readFileSync(path.join(__dirname, '../views/template.html'), 'utf-8')
    const fileName = Math.random() + '_doc' + '.pdf'

    let array = [];

    data.forEach(d => {
        const prod = {
            name: d.name,
            description: d.description,
            unit: d.unit,
            quantity: d.quantity,
            price: d.price,
            total: d.quantity * d.price,
            imgurl: d.imgurl
        }
        array.push(prod);
    })

    let subtotal = 0;
    array.forEach(i => {
        subtotal += i.total
    })

    const tax = ( subtotal * 20 ) / 100;
    const grandTotal = subtotal -tax;

    const obj = {
        prodlist: array,
        subtotal: subtotal,
        tax: tax,
        gtotal: grandTotal
    }

    const document = {
        html: html,
        data: {
            products: obj
        },
        path: './docs/' + fileName
    }

    pdf.create(document, option)
            .then(res => {
                console.log(res);
            }).catch(error => {
                console.log(error);
            });
            const filepath = 'http://localhost:3000/docs/' + fileName;

            res.render('download', {
                path: filepath
            });
}

module.exports = {
    homeView,
    generatePdf
}