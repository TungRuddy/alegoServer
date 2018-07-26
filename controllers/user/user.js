var express = require('express')
    , router = express.Router();

var mysql = require('../../sqlConnection/mySQL');
var mailerEn = require('../../mailer/mailer-en');
var mailerVn = require('../../mailer/mailer-vi');
var local_ip = require('../../config');

mysql.query('select * from user', function (result) {
    global.users = result;
});


router.get('/', function (req, res) {
    // return res.json({
    // 	users: global.users
    // });
    res.json(global.users);
    // res.json(JSON.parse('{ "name":"John", "age":30, "city":"New York"}'));
    //res.end(JSON.stringify(users || {}, ['id','name','hobby']));
});

router.post('/', function (req, res) {
    console.log(req.body);
    var reqObj = req.body;
    if (reqObj.name && reqObj.email && reqObj.password) {
        var insertSql = "INSERT INTO `user` SET ?";
        var insertValues = {
            "name": reqObj.name,
            "email": reqObj.email,
            "password": reqObj.password,
            "birthday": reqObj.birthday,
            "main_address": 0,
            "gender": reqObj.gender,
            "area": reqObj.area,
            "language": reqObj.language,
            "point": 0,
            "status": 0,
        };
        mysql.conn.query(insertSql, insertValues, function (error, results) {
            if (error) throw error;
            if (results.insertId) {
                var valueUserAddress = {
                    "id_user": results.insertId,
                    "address": reqObj.address,
                    "tagName": reqObj.name,
                    "phone": reqObj.phone,
                };
                mysql.conn.query("INSERT INTO `user_address` SET ?", valueUserAddress, function (error, address) {
                    if (address.insertId) {
                        mysql.conn.query('UPDATE `user` SET `main_address`=? where `id_user`=?', [address.insertId, results.insertId], function (err, data) {
                            console.log(data);
                            var params = {};
                            params.toEmail = reqObj.email;
                            params.name = reqObj.name;
                            params.verifyURL = `http://` + local_ip.port + `/newsignup/` + Buffer.from(String(results.insertId)).toString('base64') + `/` + Buffer.from(reqObj.email).toString('base64');

                            if (reqObj.language == "vi") {
                                params.subject = "Chào mừng đến với AgriLego - Nông trại thông minh ,cảm ơn vì đã đăng ký !";
                                mailerVn.sendNewSignUpEmail(params, function (result) {
                                    res.json({ message: 'Cảm ơn bạn đã đăng ký, hãy kiểm tra hộp thư email để kích hoạt tài khoản của bạn!' });
                                });
                            } else {
                                params.subject = "Welcome to AgriLego ,thanks for signup !";
                                mailerEn.sendNewSignUpEmail(params, function (result) {
                                    res.json({ message: 'Thanks for signup! , please check email to active your AgriLego account.' });
                                });
                            }

                        });
                    } else {
                        res.json({ message: 'Error' });
                    }
                });
            }
        });
    }
});

router.put('/:userid', function (req, res) {
    var idUser = req.params.userid;
    if (Number(idUser) > 0 && req.body) {
        console.log(idUser);
        mysql.conn.query('UPDATE `user` SET `name`=?,`password`=? ,`main_address`=? , `birthday`=? ,`gender`=?,`area`=?,`language`=? where `id_user`=?', [
            req.body.name, req.body.password, req.body.main_address, req.body.birthday, req.body.gender, req.body.area, req.body.language, idUser
        ], function (error, result, fields) {
            return res.json({
                message: 'Success',
                error: false
            });
        });
    }
    else {
        return res.json({
            message: 'Fails',
            error: true
        });
    }


});


router.get('/:userid', function (req, res) {
    for (i = 0; i < global.users.length; i++) {
        if (Number(global.users[i].id_user) === Number(req.params.userid)) {
            return res.json(global.users[i]);
        }
    }
    return res.status(404).json({
        message: 'User not found',
        error: true
    })
});


module.exports = router;