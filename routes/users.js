var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = require('./../models/user');
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');

//  连接本地mongodb数据库
mongoose.connect('mongodb://root:123456@127.0.0.1/airplane');
mongoose.connection.on("connected",function () {
    console.log("MongoDb connected success");
});
mongoose.connection.on('error',function () {
    console.log("MongoDb connected fail");
});
mongoose.connection.on('disconnected',function () {
    console.log("MongoDb connected disconnected");
});

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
		userId: req.body.userId,
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
});
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

// router.post('/uploadImg',upload.single('logo'),function (req,res,next) {
//     console.log('2222222222');
//     var file = req.file;
//     res.send({
//         errno:'0',
//         data:[]
//     });
// });

/*
*   文件上传
* */


// app.use(bodyParser.urlencoded({extended:false}));

//  设置文件上传的public/upload 路径
// var uploadDir = './upload';
// 设置可以多图/文件上传
// var upload = multer({dest:'upload/'});
//
// // 请求/返回 uploadMoreFile.html
// app.get('/',function (req, res) {
//
// });
//
// // post 请求 提交表单
// app.post('/uploadImg',upload.array('logo',2),function (req, res, next) {
//    // 多个文件上传
//     upload(req,res,function (err) {
//         if (err){
//             console.log('[system'+err.message);
//         }else {
//             // 循环处理 图片/文件
//             var fileCount = req.files.length;
//             req.files.forEach(function (i) {
//                 // 设置存储的文件路径
//                 var uploadFilePath = uploadDir+i.originalname;
//                 // 设置临时文件的储存路径
//                 var uploadTmpPath = i.path;
//                 // 读取临时文件
//                 fs.readFile(uploadTmpPath,function (err, data) {
//                     if (err){
//                         console.log('[system]'+err.message);
//                     }else {
//                         // 读取成功将内容写到上传的路径
//                         fs.writeFile(uploadFilePath,function (err, data) {
//                             if (err){
//                                 console.log('[system]'+err.message);
//                             }else {
//                                 // 写入成功 , 删除临时文件
//                                 fs.unlink(uploadTmpPath,function (err, data) {
//                                     if (err){
//                                         console.log('[system]'+err.message);
//                                     }else {
//                                         console.log('[system]'+'delete'+uploadTmpPath+'successful!');
//                                     }
//                                 })
//                             }
//                         });
//
//
//                     }
//                 })
//             })
//             /*
//                       *  所以文件上传成功
//                       * */
//             var response = {
//                 message: 'File uploaded successfully!'
//             };
//             res.end(JSON.stringify(response));
//         }
//     })
// });
// var server = app.listen(80,function () {
//     var host = '127.0.0.1';
//     var port = server.address().port;
//     console.log('[system] listen at http://%s:%s',host,port);
// });
module.exports = router;
