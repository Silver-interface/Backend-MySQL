import dotenv from "dotenv";
dotenv.config();

const nodemailer = require('nodemailer');


export const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
        user: process.env.SM_USER,
        pass: process.env.SM_PASS
    }
})

transporter.verify().then(()=>{
    console.log("Listo para enviar emails")
})

module.exports = transporter;