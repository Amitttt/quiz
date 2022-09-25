const express = require('express');
const nodemailer = require('nodemailer')
const sendMail = (to, subject, text) => {
  
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '',
        pass: ''
      }
    });
    var mailOptions = {
      from: '',
      to: to,
      subject: subject,
      text: text 
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log("Error",error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  
  }
  module.exports = sendMail;

