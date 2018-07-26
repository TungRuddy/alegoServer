var express = require('express')
    , router = express.Router();

var mysql = require('../../sqlConnection/mySQL');

router.post('/', function (req, res, next) {
    if (req.body.oldpassword && req.body.newpassword && req.body.id) {
        var sql = "select * from `user` where `id_user`=? and `password`=?";
        mysql.conn.query(sql, [req.body.id, req.body.oldpassword], function (error, results, fields) {
            if (error) throw error;
            if (results[0]) {
                var sqlUpdate = "UPDATE `user` SET `password`=? where `id_user`=?";
                mysql.conn.query(sql, [req.body.newpassword, req.body.id], function (error, results, fields) {
                    if (error) throw error;
                    return res.json({
                        message: 'true',
                    });
                });
            }else{
                return res.json({
                    message: 'false',
                });
            }
        });
    }
    else {
        return res.json({
            message: 'false',
        });
    }

});

module.exports = router;