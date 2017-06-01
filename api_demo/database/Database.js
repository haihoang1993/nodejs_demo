var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'app'
});

var connect = function () {
    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... nn");
        } else {
            console.log("Error connecting database ... nn");
        }
    })
}

var closeDB = function () {
    connection.end(function (err) {
        if (!err) console.log("close db");
    })
}



exports.getSinhVien = function (callbackQuery) {
    connect();
    connection.query("select * from SinhVien", function (err, results, fieds) {
        if (!err) {
            // tra ve sau khi load du lieu là 1 mảng dữ liệu Obj dạng json mySql
            // dùng hàm callback để trả về trương tự return;
            callbackQuery(results);
        } else {
            console.log(err);
        }
    });
}

exports.findSinhVienByID = function (id, callBackFind) {
    connect();
    connection.query("select * from SinhVien where id = " + id, function (err, results, fieds) {
        if (!err) {
            // tra ve sau khi load du lieu là 1 mảng dữ liệu Obj dạng json mySql
            // dùng hàm callback để trả về trương tự return;
            callBackFind(results);
        } else {
            console.log("Error" + err);
        }
        // closeDB();
    });
}