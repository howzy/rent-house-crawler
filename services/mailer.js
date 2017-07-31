const nodemailer = require('nodemailer');
const mailerConfig = require('../config/default').mailer;

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 465,
  secure: true, // secure:true for port 465, secure:false for port 587
  auth: {
    user: mailerConfig.user,
    pass: mailerConfig.pass
  }
});

function sendMail (subject, html) {
  // setup email data with unicode symbols
  let mailOptions = {
    from: mailerConfig.user,
    to: mailerConfig.user,
    subject: subject,
    html: html
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log(error);
  });
}

module.exports = {
  sendMail
}
