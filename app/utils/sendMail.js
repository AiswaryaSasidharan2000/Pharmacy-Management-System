const nodemailer = require("nodemailer");
const { constants } = require("../config/app.config");

const transporter = nodemailer.createTransport({
//    service:"gmail",
    host: "smtp.mailtrap.io",
    port: 25,
    auth: {
        user: constants.email.user,
        pass: constants.email.pass,
    },
});

module.exports = transporter;
