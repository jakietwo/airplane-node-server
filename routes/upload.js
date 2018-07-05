var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var multer = require('multer');

var app = express();
app.use(bodyparser.json);
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null,Date.now().toString()+'-'+file.originalname);
    }
});
var upload = multer({storage: storage});

router.post('/uploadpdf',upload.single('pdf'),function (req, res, next) {
    console.log('22222');
    console.log(req.file.size);
    console.log(req.file.path);
    res.json({
        errno: '0',
        url: req.file.path
    });
});
router.get('/',function (req, res, next) {
    console.log(req);
});
module.exports = router;