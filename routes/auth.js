var express = require("express");
var router = express.Router();
var passport = require("passport");
var GitHubStrategy = require("passport-github").Strategy

// app.use(session({secret: 'sessionsecret'}));
// app.use(passport.initialize());
// app.use(passport.session());

/* GET auth. */
passport.serializeUser(function(user, done) {
  console.log("serializeUser", user);

  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  console.log("deserializeUser", obj);
  done(null, obj);
});
router.get("/logout", function(req, res) {
  req.session.destroy();
  res.redirect("/");
});
router.get('/github',
  passport.authenticate('github'));
passport.use(
  new GitHubStrategy(
    {
      clientID: "53a2b5af338b03ee60cc",
      clientSecret: "0ba96bcd7886dc99122b2c5c875440817d928ac7",
      callbackURL: "http://localhost:3000/auth/github/callback"
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
