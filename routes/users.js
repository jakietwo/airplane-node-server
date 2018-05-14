var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = require('./../models/user');

//  连接本地mongodb数据库
mongoose.connect('mongodb://127.0.0.1/airplane');
mongoose.connection.on("connected",function () {
    console.log("MongoDb connected success");
});
mongoose.connection.on('error',function () {
    console.log("MongoDb connected fail");
});
mongoose.connection.on('disconnected',function () {
    console.log("MongoDb connected disconnected");
})

/* GET users listing. */
router.post('/login', function(req, res, next) {

  let  param = {
    userName: req.body.username,
    userPwd: req.body.password
  };
  console.log(req.body.username);
  console.log(req.body.password);
  Users.findOne(param ,function (err, doc) {
      if (err){
        res.json({
          status:'1',
          msg:err.message
        })
      }else {
        if (doc){
	        res.json({
		        status:'0',
		        result:doc,
		        name:doc.name
	        })
        }else {
            res.json({
                status:'1',
                msg:'用户名或者密码错误!'
            })
        }
       
      }
  })
});
router.post('/again',function (req, res, next) {
	let  param = {
		userName: req.body.user,
	};
	console.log(param);
	Users.findOne(param ,function (err, doc) {
		if (err){
			res.json({
				status:'1',
				msg:err.message
			})
		}else {
			if (doc){
				res.json({
					status:'0',
					result:doc,
					name:doc.name
				})
			}else {
				res.json({
					status:'1',
					msg:'用户名或者密码错误!'
				})
			}
			
		}
	})
})
router.get('/getAllUsers',function (req, res, next) {
    Users.find({},function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        }else {
            if (doc) {
                res.json({
                    status: '0',
                    result: doc
                })
            }
        }
    })
});
module.exports = router;
