var express = require('express');
var multer = require('multer');
var app = express();
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

var storage = multer.diskStorage({
   destination:function (req, file, cb) {
       cb(null,'uploads/');
   },
    filename:function (req, file, cb) {
        cb(null,Date.now().toString()+'-'+file.originalname);
    }
});
var upload = multer({storage:storage});
app.post('/uploadImg',upload.single('logo'),function (req, res, next) {
    console.log(req.file.size);
    console.log(req.file.path);
    res.json({
        errno:'0' ,
        url:req.file.path
    });
});
module.exports = app;
