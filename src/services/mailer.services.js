import transporter  from "../config/mailer.config.js";

await transporter.sendEmail({
    from: '"<Generalshop - Confirmacionde Compra>" <<generalshop093@gmail.com>>',
    to: 'andresdavid1313@gmail.com',
    subject: 'Confirmacion de compra ✔',
    text: 'Hello world?',
    html: '<b>Hello world?</b>'
})