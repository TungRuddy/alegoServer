var express = require('express')
    , router = express.Router();

var mysql = require('../../sqlConnection/mySQL');
var mailerEn = require('../../mailer/mailer-en');
var mailerVn = require('../../mailer/mailer-vi');
var local_ip = require('../../config');
router.post('/', function (req, res, next) {
    if (req.body.email) {
        var sql = "select * from `user` where `email`=?";
        mysql.conn.query(sql, [req.body.email], function (error, results, fields) {
            if (error) throw error;
            if (results[0]) {
                var dataRequet = {
                    "id_user": results[0].id_user
                };
                mysql.conn.query("INSERT INTO `forgot_password` SET ?", dataRequet, function (error, request, fields) {
                    if (request.insertId) {
                        var params = {};
                        params.toEmail = req.body.email;
                        params.name = results[0].name;
                        params.subject = "Reset Password";
                        params.verifyURL = `http://` + local_ip.port + `/resetpassword/` + Buffer.from(String(request.insertId)).toString('base64') + `/` + Buffer.from(String(results[0].id_user)).toString('base64');
                        console.log(params);
                        if (results[0].language == "vi") {
                            mailerVn.sendForgotPasswordEmail(params, function (result) {
                                res.json({ message: 'Yêu cầu đã được gửi vào email của bạn!' });
                            });
                        } else {
                            mailerEn.sendForgotPasswordEmail(params, function (result) {
                                res.json({ message: 'Send out a Forgotpassword email' });

                            });
                        }
                    }
                });
            }
            else {
                return res.json({
                    message: false,
                });
            }
        });
    }
    else {
        return res.json({
            message: false,
        });
    }

});

module.exports = router;