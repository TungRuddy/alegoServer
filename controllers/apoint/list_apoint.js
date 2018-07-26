var express = require('express')
    , router = express.Router();

var mysql = require('../../sqlConnection/mySQL');

router.get('/:area', function (req, res) {
    if (req.params.area) {
        var sql = `SELECT * FROM apoint WHERE area = ? ORDER BY name`;
        mysql.conn.query(sql, [req.params.area], function (error, results) {
            if (error) throw error;
            console.log(results);
            if (results[0]) {
                res.json(results);
            }
            else {
                return res.json({
                    message: 'false',
                });
            }
        });
    } else {
        return res.json({
            message: 'false',
        });
    }
});
module.exports = router;