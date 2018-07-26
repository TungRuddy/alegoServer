var express = require('express')
    , router = express.Router();

var mysql = require('../../sqlConnection/mySQL');

router.post('/', function (req, res, next) {
    if (req.body.email) {
        var sql = "SELECT COUNT(*) as `status` FROM `user` WHERE `email` = ?";
        mysql.conn.query(sql, [req.body.email], function (error, results, fields) {
            if (error) throw error;
            console.log(results);
            if (Number(results[0].status) > 0) {
                return res.json({
                    message: true,
                });
            }
            else {
                return res.json({
                    message: false,
                });
            }
        });
    }
});

module.exports = router;