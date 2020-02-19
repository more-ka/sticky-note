/*
 * @Author: your name
 * @Date: 2019-10-18 19:13:47
 * @LastEditTime: 2020-02-19 14:50:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \stciky-note\routes\api.js
 */
var express = require("express");
var router = express.Router();
var Note = require("../model/sqlite.js").Note;

/* GET users list. */
router.get("/notes", function(req, res, next) {
  var query = { raw: true };
  if (req.session.user) {
    query.where = {
      userId: req.session.user.id
    };
  }
  Note.findAll(query)
    .then(function(notes) {
      res.send({ status: 0, data: notes });
      console.log(notes);
    })
    .catch(function() {
      res.send({ status: 1, msg: "数据库出错,请重试" });
    });
});
router.post("/notes/add", function(req, res, next) {
  if (!req.session.user) {
    return res.send({ status: 1, errorMsg: "请登录" });
  }
  var userId = req.session.user.id;
  let getTime = function(){
    var myDate = new Date();
    function getNow(s) { return s < 10 ? '0' + s: s; }
    var year = myDate.getFullYear(); //获取当前年
    var month = myDate.getMonth() + 1; //获取当前月
    var date = myDate.getDate(); //获取当前日
    var Hours = myDate.getHours(); //声明变量Hours 获取当前时间的时
    var Minutes = myDate.getMinutes(); //声明变量Minutes 获取当前时间的分
    var Seconds = myDate.getSeconds(); //声明变量Seconds  获取当前时间的秒
    let createTime = year + "年" + month + "月" + date + "日"+' '+getNow(Hours)+':'+getNow(Minutes)+':'+getNow(Seconds)
    return createTime
  }
  Note.create({ text: req.body.note, userId: userId, createTime: getTime() })
    .then(function() {
      res.send({ status: 0 });
    })
    .catch(function() {
      res.send({ status: 1, msg: "数据库出错,请重试" });
    });
});
router.post("/notes/delete", function(req, res, next) {
  if (!req.session.user) {
    return res.send({ status: 1, errorMsg: "请登录" });
  }
  console.log('id:',req.body.id)
  Note.destroy({ where: { id: req.body.id } })
    .then(function() {
      res.send({ status: 0 });
    })
    .catch(function() {
      res.send({ status: 1, msg: "数据库出错,请重试" });
    });
});
router.post("/notes/edit", function(req, res, next) {
  if (!req.session.user) {
    return res.send({ status: 1, errorMsg: "请登录" });
  }
  Note.update(
    { text: req.body.note },
    { where: { id: req.body.id } }
  )
    .then(function() {
      res.send({ status: 0 });
    })
    .catch(function() {
      res.send({ status: 0, msg: "数据库出错,请重试" });
    });
});
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
