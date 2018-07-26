var express = require('express'), router = express.Router();

var mysql = require('../../sqlConnection/mySQL');

router.get('/:id_order', function (req, res) {
    var sql = `SELECT a.*,b.bCode,b.price,b.saleoff,b.weight,b.point,b.dueday,b.type_beef,b.type_milk,b.id_apoint,b.AWS,
    b.W2D,b.ADC,b.D2A,b.AAP, c.*,c.name as 'nameCpass',d.*,d.name as 'nameSpecies', e.name
        FROM user_orders_details a 
        LEFT JOIN bcode b on a.bcode = b.bcode
        LEFT JOIN cpass c on c.cPass = b.cpass
        LEFT JOIN species d on c.id_species = d.id_species
        LEFT JOIN farm e on c.id_farm = e.id_farm
    where a.id_order = ?`;
    mysql.conn.query(sql, [req.params.id_order], function (error, results) {
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

router.get('/userorder/:iduser', function (req, res) {
    var sql = `SELECT * FROM user_orders WHERE id_user =? ORDER by date DESC`;
    mysql.conn.query(sql, [req.params.iduser], function (error, results) {
        if (error) throw error;
        if (results[0]) {
            res.json(results);
        }
    });
});

router.post('/userorder', function (req, res) {
    if (req.body.id_user && req.body.details.length > 0) {
        var insertSql = "INSERT INTO `user_orders` SET ?";
        var insertValues = {
            "id_user": req.body.id_user,
            "receiver": req.body.receiver,
            "address": req.body.address,
            "total_price": req.body.total_price,
            "phone": req.body.phone,
            "status": 1,
            "type_buy": req.body.type_buy,
            "type_pay": req.body.type_pay,
            "st1": new Date().toISOString(),
            "date_order": new Date().toISOString(),
        };
        mysql.conn.query(insertSql, insertValues, function (error, results) {
            if (error) throw error;
            if (results.insertId) {
                req.body.details.forEach(item => {
                    var insertDetails = "INSERT INTO `user_orders_details` SET ?";
                    var values;
                    if (item.type < 3) {
                        values = {
                            "id_order": results.insertId,
                            "bcode": item.bCode ? item.bCode : 0,
                            "quantity": item.buy ? item.buy : 0,
                            "end_price": item.priceItemBuy ? item.priceItemBuy : 0,
                        };
                        mysql.conn.query(insertDetails, values, function (error, data) {
                            if (data.insertId) {
                                if (Number(item.type) === 1) {
                                    item.can_buy = 0;
                                }
                                if ((Number(item.inventory) - Number(item.buy)) < 1) {
                                    item.can_buy = 0;
                                }
                                var sql = "UPDATE `bcode` SET `can_buy` = '" + item.can_buy + "' , `AAO` = '" + new Date().toISOString() + "' ,`inventory` = inventory -'" + item.buy + "'  WHERE `bcode`.`bCode` = " + item.bCode;
                                mysql.conn.query(sql, function (error, status) {
                                    var sqlUpdatePoint = `UPDATE user SET point = point + ` + item.point + ` where id_user=` + req.body.id_user;
                                    mysql.conn.query(sqlUpdatePoint, function (error, status) { });
                                });
                            }
                        });
                    }
                    else {
                        values = {
                            "id_order": results.insertId,
                            "bounes": item.name_bounes,
                            "type_product": item.type,
                            "product_bounes": item.id_bounes,
                            "quantity": 1,
                            "end_price": item.point ? item.point : 0,
                        };
                        mysql.conn.query(insertDetails, values, function (error, data) {
                            if (data.insertId) {
                                var sqlUpdatePoint = `UPDATE user SET point = point - ` + item.point + ` where id_user=` + req.body.id_user;
                                mysql.conn.query(sqlUpdatePoint, function (error, status) { });
                            }
                        });
                    }
                });
                return res.json({
                    message: true
                });
            } else {
                return res.json({
                    message: false,
                });
            }


        });
    }
});

module.exports = router;