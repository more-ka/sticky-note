/*
 * @Author: your name
 * @Date: 2020-02-23 16:27:38
 * @LastEditTime: 2020-02-24 13:39:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sticky-note\routes\auth.js
 */
var express = require("express");
var router = express.Router();
var passport = require("passport");
var GitHubStrategy = require("passport-github").Strategy


/* GET auth. */
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
router.get("/logout", function(req, res) {
  req.session.destroy();
  res.redirect("/");
});
router.get('/github',
  passport.authenticate('github'));
passport.use(
  // 本地调试
  // new GitHubStrategy(
  //   {
  //     clientID: "53a2b5af338b03ee60cc",
  //     clientSecret: "0ba96bcd7886dc99122b2c5c875440817d928ac7",
  //     callbackURL: "http://localhost:3000/auth/github/callback"
  //   },
  //   function(accessToken, refreshToken, profile, done) {
  //     // User.findOrCreate({ githubId: profile.id }, function (err, user) {
  //     // });
  //     done(null, profile);
  //   }
  // )
  // 腾讯云服务器
  new GitHubStrategy(
    {
      clientID: "739f101197e8fe8e5317",
      clientSecret: "c8c143aba2b685b15b018a8a03e4cb26e92224a7",
      callbackURL: "http://118.25.89.253:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      // });
      done(null, profile);
    }
  )

);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function(req, res) {
    req.session.user = {
      id: req.user.id,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider
    };
    res.redirect("/");
  }
);

module.exports = router;
