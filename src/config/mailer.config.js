const nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
        user: '<generalshop093@gmail.com>',
        pass: '<htot dicr asud dqgf>'
    }
})

module.exports = transporter;