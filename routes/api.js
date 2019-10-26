var express = require('express');
var router = express.Router();
var Note = require('../model/sqlite.js').Note

/* GET users listing. */
router.get('/notes',function(req,res,next){
  var query = {raw: true}
  if(req.session.user){
    query.where = {
      userId: req.session.user.id
    }
  }
  Note.findAll(query).then(function(notes){
    res.send({status:0,data:notes})
    console.log(notes);
    
  }).catch(function(){
    res.send({status: 1,msg:'数据库出错,请重试'})
  })
})
router.post('/notes/add',function(req,res,next){
  if(!req.session.user){
    return res.send({status: 1,errorMsg: '请登录'})
  }
  var userId = req.session.user.id
  Note.create({text:req.body.note,userId:userId}).then(function(){
    res.send({status: 0})
  }).catch(function(){
    res.send({status: 1,msg:'数据库出错,请重试'})
  })
})
router.post('/notes/delete',function(req,res,next){
  if(!req.session.user){
    return res.send({status: 1,errorMsg: '请登录'})
  }
  Note.destroy({where:{id:req.body.id}}).then(function(){
    res.send({status: 0})
  }).catch(function(){
    res.send({status: 1,msg:'数据库出错,请重试'})
  })
})
router.post('/notes/edit',function(req,res,next){
  if(!req.session.user){
    return res.send({status: 1,errorMsg: '请登录'})
  }
  Note.update({text:req.body.note},{where:{id:req.body.id}}).then(function(){
    res.send({status: 0})
  }).catch(function(){
    res.send({status: 0,msg:'数据库出错,请重试'})
  })
})
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
