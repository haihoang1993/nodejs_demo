// khởi chạy nodejs bằng cmd
// node index


var express = require('express');

var database = require("./database/Database");

var app = express();

// demo trả về json
// http://localhost:3000/DemoJson
app.get('/DemoJson', function (req, res) {
  var sinhvVien = { id: "sv1", hoTen: "Hoang Hai" }
  res.json({ sinhvVien })
});


// demo json lấy tham số phương thức get, post
//http://localhost:3000/DemoJsonGet?id=1&&hoTen=hoang%20Hai
app.get("/DemoJsonGet", function (req, res) {
  var sinhVien = {}; 
  // req.query lấy cái tham số khi dùng get hoặc post
  sinhVien.id = req.query.id;
  sinhVien.hoTen = req.query.hoTen;
  res.json(sinhVien);
})

//http://localhost:3000/ListSinhVien
app.get("/ListSinhVien", function (req, res) {
  database.getSinhVien(function (resultQuery) {
    res.json(resultQuery);
  });
});


//http://localhost:3000/FindSVByid?id=1
app.get("/FindSVByid", function (req, res) {
  var id = req.query.id;
  database.findSinhVienByID(id,function (resultQuery) {
    //
    if (resultQuery.length ===0) {
      var resutNotFind = { status: -1, text: " Khong tim thay" };
      res.json(resutNotFind);
    } else {
      var resutOk={status:1,sinh_vien:resultQuery};
      res.json(resutOk);
    }
  });
});
// database.connectDB();
app.listen(3000);