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

function sendMail(data) {
  let html = '';
  html += "<h1><a href=\"" + data.url + "\" target=\"_blank\">" + data.title + "</a></h1>"
        + "<span>" + data.createTime + "</span>";

  for (let i = 0; i < data.details.length; i++) {
    html += "<p>" + data.details[i] + "</p>";
  }

  html += "<ul>";
  for (let i = 0; i < data.pics.length; i++) {
    html += "<li><img src=\"" + data.pics[i] + "\"></li>";
  }
  html += "</ul>";

  // setup email data with unicode symbols
  let mailOptions = {
    from: mailerConfig.user,
    to: mailerConfig.user,
    subject: data.title,
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
