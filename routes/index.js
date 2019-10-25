var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  var data;
  console.log("--------",req.session.user);
  if (req.session.user) {
    data = {
      isLogin: true,
      user: req.session.user
    };
  } else {
  console.log('111',data);
  // user: req.session.user
    data = {
      isLogin: false
    };
  }
  res.render("index", data);
});

module.exports = router;
