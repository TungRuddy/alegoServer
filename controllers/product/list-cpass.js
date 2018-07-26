var express = require('express')
    , router = express.Router();

var mysql = require('../../sqlConnection/mySQL');

router.get('/:area/:type', function (req, res) {
    if (req.params.area && req.params.type) {
        var sql = `SELECT a.*,b.name as area FROM 
        (SELECT a.*,b.id_AA,b.id_area,c.species,c.farm,c.name as 'nameCpass',c.type , c.duedate 
        FROM bcode a LEFT JOIN area_apoint b on a.id_apoint = b.id_apoint LEFT JOIN cpass c on a.cpass = c.cpass where a.can_buy = 1)
        a LEFT JOIN area b on a.id_area = b.id_area WHERE b.name =? AND a.type =? AND a.can_buy = 1`;
        mysql.conn.query(sql, [req.params.area, req.params.type], function (error, results) {
            if (error) throw error;
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
router.get('/:area/:type/:typebeef', function (req, res) {
    if (req.params.area && req.params.type && req.params.typebeef) {
        var sql = `SELECT a.*,b.name as area FROM 
        (SELECT a.*,b.id_AA,b.id_area,c.species,c.farm,c.name as 'nameCpass',c.type , c.duedate 
        FROM bcode a LEFT JOIN area_apoint b on a.id_apoint = b.id_apoint LEFT JOIN cpass c on a.cpass = c.cpass where a.can_buy = 1)
        a LEFT JOIN area b on a.id_area = b.id_area WHERE b.name =? AND a.type =? AND a.can_buy = 1 AND a.type_beef =?`;
        mysql.conn.query(sql, [req.params.area, req.params.type, req.params.typebeef], function (error, results) {
            if (error) throw error;
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
router.get('/:area/:type/:typebeef/:idApoint', function (req, res) {
    if (req.params.area && req.params.type && req.params.typebeef && req.params.idApoint) {
        if (req.params.typebeef === '0') {
            var sql = `SELECT a.*,b.name as area FROM 
            (SELECT a.*,b.id_AA,b.id_area,c.species,c.farm,c.name as 'nameCpass',c.type , c.duedate 
            FROM bcode a LEFT JOIN area_apoint b on a.id_apoint = b.id_apoint LEFT JOIN cpass c on a.cpass = c.cpass where a.can_buy = 1)
            a LEFT JOIN area b on a.id_area = b.id_area WHERE b.name =? AND a.type =? AND a.can_buy = 1 AND a.id_apoint =?`;
            mysql.conn.query(sql, [req.params.area, req.params.type, req.params.idApoint], function (error, results) {
                if (error) throw error;
                if (results[0]) {
                    res.json(results);
                }
                else {
                    return res.json({
                        message: 'false',
                    });
                }
            });
        }
        else {
            var sql = `SELECT a.*,b.name as area FROM 
            (SELECT a.*,b.id_AA,b.id_area,c.species,c.farm,c.name as 'nameCpass',c.type , c.duedate 
            FROM bcode a LEFT JOIN area_apoint b on a.id_apoint = b.id_apoint LEFT JOIN cpass c on a.cpass = c.cpass where a.can_buy = 1)
            a LEFT JOIN area b on a.id_area = b.id_area WHERE b.name =? AND a.type =? AND a.can_buy = 1 AND a.type_beef =? AND a.id_apoint =?`;
            mysql.conn.query(sql, [req.params.area, req.params.type, req.params.typebeef, req.params.idApoint], function (error, results) {
                if (error) throw error;
                if (results[0]) {
                    res.json(results);
                }
                else {
                    return res.json({
                        message: 'false',
                    });
                }
            });
        }

    } else {
        return res.json({
            message: 'false',
        });
    }
});

router.get('/:bcode', function (req, res) {
    var sql = `SELECT 
    a.bCode,a.name,a.quantity,a.price,a.weight,a.point,a.dueday,a.type_beef,a.type_milk,
    b.cPass,b.species,b.farm,b.type,
    c.id_apoint,c.area,c.address,c.longitude,c.latitude,c.phone 
    FROM bcode a inner join cpass b on a.cpass = b.cPass 
    INNER JOIN apoint c on a.id_apoint = c.id_apoint 
    where a.bCode = ?`;
    mysql.conn.query(sql, [req.params.bcode], function (error, results) {
        if (error) throw error;
        console.log(results)
        if (results[0]) {
            res.json(results);
        }
        else {
            return res.json({
                message: 'false',
            });
        }
    });
});
module.exports = router;