var express = require('express'), router = express.Router();

var mysql = require('../../sqlConnection/mySQL');

router.get('/:userid', function (req, res, next) {
    if (req.params.userid) {
        var sql = "select * from `user_address` where id_user =?";
        mysql.conn.query(sql, [req.params.userid], function (error, results, fields) {
            if (error) throw error;
            if (results[0]) {
                res.json(results);
            }
        });
    }
    else {
        return res.json({
            message: false,
        });
    }

});

router.post('/:userid', function (req, res, next) {
    if (req.params.userid && req.body) {
        var dataRequet = {
            "id_user": req.params.userid,
            "tagName": req.body.tagName,
            "address": req.body.address,
            "phone": req.body.phone,
        };
        var sql = "INSERT INTO `user_address` SET ?";
        mysql.conn.query(sql, dataRequet, function (error, results, fields) {
            if (error) throw error;
            if (results.insertId) {
                return res.json({
                    message: true,
                    insertId: results.insertId
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

router.put('/:id_address', function (req, res, next) {
    if (req.params.id_address) {
        var sql = "UPDATE `user_address` SET `tagName`=?,`address`=? ,`phone`=? where `id_address`=?";
        mysql.conn.query(sql, [req.body.tagName, req.body.address, req.body.phone, req.params.id_address], function (error, results, fields) {
            if (error) throw error;
            return res.json({
                message: true,
                error: false
            });
        });
    }
    else {
        return res.json({
            message: false,
        });
    }

});

router.delete('/:idAddress', function (req, res, next) {
    if (req.params.idAddress) {
        var sql = "DELETE FROM user_address WHERE id_address =?";
        mysql.conn.query(sql, [req.params.idAddress], function (error, results, fields) {
            if (error) throw error;
            return res.json({
                message: true,
                error: false
            });
        });
    }
    else {
        return res.json({
            message: false,
        });
    }

});

module.exports = router;