var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");


// root route
router.get("/", function (req, res) {
    res.render("landing");
});

// show register form
router.get("/register", function(req, res){
    res.render("register", {page: "register"});
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Study Paradise " + user.username);
            res.redirect("/study_rooms");
        });
    });
});

// show login form
router.get("/login", function(req, res){
    res.render("login", {page: "login"});
});

// handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/study_rooms",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/study_rooms");
});


module.exports = router;