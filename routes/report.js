var express = require('express');
var router = express.Router();
var Reports = require('./../models/report');

router.get('/getAllreport',function (req, res, next) {
   Reports.find({},function (err, doc) {
       if (err) {
           res.json({
               status:'1',
               msg: err.message
           })
       }else {
           if (doc){
               res.json({
                   status: '0',
                   result: doc
               })
           }else {
               res.json({
                   status:'1',
                   msg:"未获得数据"
               })
           }
       }
   })
});
router.post('/getreport',function (req, res, next) {
    let params = {
        reportId:req.body.reportId
    };
   Reports.findOne(params,function (err, doc) {
       if (err){
           res.json({
               status:'1',
               msg:err.message
           })
       }else {
           if (doc){
               res.json({
                   status: '0',
                   result: doc
               })
           }else {
               res.json({
                   status: '1',
                   mes: '数据不存在'
               })
           }
       }
   })
});
module.exports = router;