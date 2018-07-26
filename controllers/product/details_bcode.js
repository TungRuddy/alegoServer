var express = require('express')
    , router = express.Router();

var mysql = require('../../sqlConnection/mySQL');

router.get('/:area/:type', function (req, res) {
    if (req.params.area && req.params.type) {
        var sql = `SELECT * , b.name as 'nameApoint',c.name as 'nameCpass',d.name as 'nameFarm',e.name as 'nameSpecies' FROM bcode a 
        LEFT JOIN apoint b on a.id_apoint = b.id_apoint 
        LEFT JOIN cpass c on a.cpass = c.cpass 
        LEFT JOIN farm d on c.id_farm = d.id_farm 
        LEFT JOIN species e on c.id_species = e.id_species 
        where a.can_buy = 1 AND b.area = ? AND c.type = ?`;
        mysql.conn.query(sql, [req.params.area, req.params.type], function (error, results) {
            if (error) throw error;
            if (results[0]) {
                res.json(results);
            }
            else {
                return res.json({
                    message: false,
                });
            }
        });
    } else {
        return res.json({
            message: false,
        });
    }
});
router.get('/:area/:type/:typepath', function (req, res) {
    if (req.params.area && req.params.type && req.params.typepath) {
        var sql = `SELECT * , b.name as 'nameApoint',c.name as 'nameCpass',d.name as 'nameFarm',e.name as 'nameSpecies' FROM bcode a 
        LEFT JOIN apoint b on a.id_apoint = b.id_apoint 
        LEFT JOIN cpass c on a.cpass = c.cpass 
        LEFT JOIN farm d on c.id_farm = d.id_farm 
        LEFT JOIN species e on c.id_species = e.id_species 
        where a.can_buy = 1 AND b.area = ? AND c.type = ? AND `;
        if (req.params.type === '1') {
            sql += `a.type_beef = ?`;
        } else if (req.params.type === '2') {
            sql += `a.type_milk = ?`;
        }
        mysql.conn.query(sql, [req.params.area, req.params.type, req.params.typepath], function (error, results) {
            if (error) throw error;
            if (results[0]) {
                res.json(results);
            }
            else {
                return res.json({
                    message: false,
                });
            }
        });
    } else {
        return res.json({
            message: false,
        });
    }
});
router.get('/:area/:type/:typepath/:species', function (req, res) {
    if (req.params.area && req.params.type && req.params.typepath && req.params.species) {
        var sql = `SELECT a.*, b.name as 'nameApoint', b.area,b.address,b.phone,c.name as 'nameCpass',c.type,c.duedate,d.name as 'nameFarm',e.name as 'nameSpecies', e.id_species as 'idloai' FROM bcode a 
            LEFT JOIN apoint b on a.id_apoint = b.id_apoint 
            LEFT JOIN cpass c on a.cpass = c.cpass 
            LEFT JOIN farm d on c.id_farm = d.id_farm 
            LEFT JOIN species e on c.id_species = e.id_species 
            where a.can_buy = 1 AND b.area = ? AND c.type = ? `;
        if (req.params.type === '1') {

            if (req.params.typepath === '0') {
                sql += `AND e.id_species = ?`;
                mysql.conn.query(sql, [req.params.area, req.params.type, req.params.species], function (error, results) {
                    if (error) throw error;
                    if (results[0]) {
                        res.json(results);
                    }
                    else {
                        return res.json({
                            message: false,
                        });
                    }
                });
            }
            if (req.params.typepath !== '0') {
                sql += `AND a.type_beef = ? AND e.id_species = ?`;
                mysql.conn.query(sql, [req.params.area, req.params.type, req.params.typepath, req.params.species], function (error, results) {
                    if (error) throw error;
                    if (results[0]) {
                        res.json(results);
                    }
                    else {
                        return res.json({
                            message: false,
                        });
                    }
                });
            }

        }
        if (req.params.type === '2') {
            mysql.conn.query(sql, [req.params.area, req.params.type], function (error, results) {
                if (error) throw error;
                if (results[0]) {
                    res.json(results);
                }
                else {
                    return res.json({
                        message: false,
                    });
                }
            });

        }
        if (req.params.type === '3') {
            var sql3 = `SELECT * FROM bounes`;
            mysql.conn.query(sql3, function (error, results) {
                if (error) throw error;
                if (results[0]) {
                    res.json(results);
                }
                else {
                    return res.json({
                        message: false,
                    });
                }
            });
        }
    } else {
        return res.json({
            message: false,
        });
    }
});

router.get('/:bcode', function (req, res) {
    var sql = `SELECT * , b.name as 'nameApoint',c.name as 'nameCpass',d.name as 'nameFarm',e.name as 'nameSpecies' FROM bcode a 
    LEFT JOIN apoint b on a.id_apoint = b.id_apoint 
    LEFT JOIN cpass c on a.cpass = c.cpass 
    LEFT JOIN farm d on c.id_farm = d.id_farm 
    LEFT JOIN species e on c.id_species = e.id_species 
    where a.bCode = ?`;
    mysql.conn.query(sql, [req.params.bcode], function (error, results) {
        if (error) throw error;
        console.log(results)
        if (results[0]) {
            res.json(results);
        }
        else {
            return res.json({
                message: false,
            });
        }
    });
});
router.post('/:bcode/:canbuy', function (req, res) {
    var sql = "UPDATE `bcode` SET `can_buy` = '" + req.params.canbuy + "' WHERE `bcode`.`bCode` = " + req.params.bcode;
    mysql.conn.query(sql, function (error, status) {
        return res.json({
            message: sql,
        });
    });
});

router.post('/saleoff', function (req, res) {
    var sql = `SELECT *,d.name as 'species' FROM bcode a 
    INNER JOIN cpass b ON a.cpass = b.cPass 
    INNER JOIN apoint c on a.id_apoint = c.id_apoint 
    INNER JOIN species d on b.id_species = d.id_species `;
    sql += "WHERE c.area = '" + req.body.area + "' AND b.type = " + req.body.type + " AND a.can_buy = 1 AND a.saleoff > 0";
    mysql.conn.query(sql, function (error, results) {
        if (error) throw error;
        if (results[0]) {
            res.json(results);
        }
        else {
            return res.json({
                message: false,
            });
        }
    });
});

router.post('/search', function (req, res, next) {
    if (req.body.name) {
        var sql = `SELECT 
        a.*,
        d.name as "farm",
        b.cPass,b.species,b.type,
        c.id_apoint,c.area,c.address,c.longitude,c.latitude,c.phone 
        FROM bcode a LEFT join cpass b on a.cpass = b.cPass 
        LEFT JOIN apoint c on a.id_apoint = c.id_apoint  
        LEFT JOIN farm d on d.id_farm = a.id_farm`
        sql += ' where a.name like "%' + req.body.name + '%"';
        mysql.conn.query(sql, function (error, results, fields) {
            if (error) throw error;
            if (results[0]) {
                return res.json({
                    data: results,
                    count: results.length
                });
            }
            else {
                return res.json({
                    data: []
                });
            }
        });
    }
    else {
        return res.json({
            message: false
        });
    }

});
module.exports = router;