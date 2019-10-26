var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  var data;
  if (req.session.user) {
    data = {
      isLogin: true,
      user: req.session.user
    };
  } else {
  // user: req.session.user
    data = {
      isLogin: false
    };
  }
  res.render("index", data);
});

module.exports = router;
