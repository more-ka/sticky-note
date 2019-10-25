var express = require('express');
var router = express.Router();
var Note = require('../model/sqlite.js').Note

/* GET users listing. */
router.get('/notes',function(req,res,next){
  Note.findAll().then(function(notes){
    res.send({status:0,data:notes})
  }).catch(function(){
    res.send({status: 1,msg:'数据库出错,请重试'})
  })
})
router.post('/notes/add',function(req,res,next){
  Note.create({text:req.body.note}).then(function(){
    res.send({status: 0})
  }).catch(function(){
    res.send({status: 1,msg:'数据库出错,请重试'})
  })
})
router.post('/notes/delete',function(req,res,next){
  Note.destroy({where:{id:req.body.id}}).then(function(){
    res.send({status: 0})
  }).catch(function(){
    res.send({status: 1,msg:'数据库出错,请重试'})
  })
})
router.post('/notes/edit',function(req,res,next){
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
