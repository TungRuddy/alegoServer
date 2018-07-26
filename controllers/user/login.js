var express = require('express')
    , router = express.Router();

var mysql = require('../../sqlConnection/mySQL');

router.post('/', function (req, res, next) {
    if (req.body.email && req.body.password) {
        var sql = "SELECT * FROM `user` a INNER JOIN `user_address` b ON a.main_address = b.id_address WHERE a.password = ? AND a.email = ? AND a.status = 1";
        mysql.conn.query(sql, [req.body.password, req.body.email], function (error, results, fields) {
            if (error) throw error;
            if (results[0]) {
                return res.json({
                    message: true,
                    data: results
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
router.post('/google', function (req, res, next) {
    if (req.body.email && req.body.provider === 'GOOGLE') {
        var reqObj = req.body;
        var sql = "SELECT COUNT(*) as `status` FROM `user` WHERE `email` = ?";
        mysql.conn.query(sql, [req.body.email], function (error, results, fields) {
            if (error) throw error;
            if (Number(results[0].status) > 0) {
                // login
                var userSQL = "SELECT * FROM `user` a INNER JOIN `user_address` b ON a.main_address = b.id_address WHERE a.email = ? AND a.status = 1";
                mysql.conn.query(userSQL, [req.body.email], function (error, results, fields) {
                    if (error) throw error;
                    if (results[0]) {
                        return res.json({
                            message: true,
                            data: results
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
                // create
                var insertSql = "INSERT INTO `user` SET ?";
                var insertValues = {
                    "name": reqObj.name,
                    "email": reqObj.email,
                    "password": 0,
                    "birthday": '',
                    "main_address": 0,
                    "avatar": reqObj.photoUrl,
                    "gender": 1,
                    "area": 'HCM',
                    "language": 'vi',
                    "point": 0,
                    "status": 1,
                };
                mysql.conn.query(insertSql, insertValues, function (error, results) {
                    if (error) throw error;
                    if (results.insertId) {
                        var valueUserAddress = {
                            "id_user": results.insertId,
                            "address": 'Địa chỉ mặc định của bạn',
                            "tagName": reqObj.name,
                            "phone": '',
                        };
                        mysql.conn.query("INSERT INTO `user_address` SET ?", valueUserAddress, function (error, address) {
                            if (address.insertId) {
                                mysql.conn.query('UPDATE `user` SET `main_address`=? where `id_user`=?', [address.insertId, results.insertId], function (err, data) {
                                    // login
                                    var userSQL = "SELECT * FROM `user` a INNER JOIN `user_address` b ON a.main_address = b.id_address WHERE a.email = ? AND a.status = 1";
                                    mysql.conn.query(userSQL, [reqObj.email], function (error, results, fields) {
                                        if (error) throw error;
                                        if (results[0]) {
                                            return res.json({
                                                message: true,
                                                data: results
                                            });
                                        }
                                        else {
                                            return res.json({
                                                message: false,
                                            });
                                        }
                                    });
                                });
                            } else {
                                res.json({ message: false });
                            }
                        });
                    }
                });
                // end

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