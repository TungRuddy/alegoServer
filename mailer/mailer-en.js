/* global __dirname */
'use strict';
var nodemailer = require('../node_modules/nodemailer');
var path = require('path');
var emailTemplates = require('../node_modules/email-templates');
var templatesDir = path.resolve(__dirname, '..', 'mailer/templates-en');

var configMail = {
    user:'manhtung321@gmail.com',
    pass:'eelwtnocplnpoquh'
};
// Local 
var EmailAddressRequiredError =  Error('email address required');
var SubjectRequiredError =  Error('email address required');
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: configMail.user, // generated ethereal user
        pass: configMail.pass  // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
});


exports.sendForgotPasswordEmail = function (params, fn) {

    var params = {
        toEmail: params.toEmail,
        subject: params.subject,
        name: params.name,
        verifyURL: params.verifyURL,
        template: 'forgotpassword'
    };
    if (!params.toEmail) {
        return fn(EmailAddressRequiredError);
    }
    if (!params.subject) {
        return fn(SubjectRequiredError);
    }
    emailTemplates(templatesDir, function (err, template) {
        if (err) {
            console.log(err);
            return fn(err);
        }
        template(params.template, { params }, function (err1, html, text) {
            if (err1) {

                return fn(err1);
            }
            transporter.sendMail({
                from: { name: 'AgriLego - Nông nghiệp thông minh', email: configMail.user },
                to: params.toEmail,
                subject: params.subject,
                html: html,
                text: text
            }, function (params, err2, responseStatus) {
                if (err2) {
                    return fn(err2);
                } else {

                    return fn(null, responseStatus.messageId, html, text);
                }
            });
        });
    });
};
exports.sendNewSignUpEmail = function (params, fn) {
    var params = {
        toEmail: params.toEmail,
        subject: params.subject,
        name: params.name,
        verifyURL: params.verifyURL,
        template: 'newsignup'
    };
    if (!params.toEmail) {
        return fn(EmailAddressRequiredError);
    }
    if (!params.subject) {
        return fn(SubjectRequiredError);
    }
    emailTemplates(templatesDir, function (err, template) {
        if (err) {

            return fn(err);
        }
        template(params.template, { params }, function (err1, html, text) {
            if (err1) {
                console.log(err1);
                return fn(err1);
            }
            transporter.sendMail({
                from: { name: 'AgriLego - Smart Agriculture', email: configMail.user },
                to: params.toEmail,
                subject: params.subject,
                html: html,
                text: text
            }, function (params, err2, responseStatus) {
                if (err2) {

                    return fn(err2);
                } else {

                    return fn(null, responseStatus.messageId, html, text);
                }
            });
        });
    });
};