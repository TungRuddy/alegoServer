var express = require('express');
var app = express();
var mysql = require('mysql');

con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "alego"
});

exports.conn = mysql.createConnection({
    host: "localhost",  // sql200.epizy.com            //sql12.freemysqlhosting.net
    user: "root",                 // epiz_22223626               //sql12242320
    password: "",              // qtU13PVziUfo                //tNihDCZz1A
    database: "alego"              // epiz_22223626_alego         // sql12242320
});

exports.connect = function () {
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected Database");
    });
};
exports.query = function (sql, callback) {
    con.query(sql, function (err, results) {
        if (err) throw err;
        return callback(results);
    })
}
exports.queryParams = function (sql,params, callback) {
    con.query(sql,params, function (err, results) {
        if (err) throw err;
        return callback(results);
    })
}


