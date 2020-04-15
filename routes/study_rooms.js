var express = require("express");
var router  = express.Router();
var Study_room = require("../models/study_room");
var middleware = require("../middleware");


// INDEX - shows all study rooms
router.get("/", function (req, res) {
    // get all study rooms from DB
    Study_room.find({}, function (err, all_study_rooms) {
        if (err){
            console.log(err);
        } else {
            res.render("study_rooms/index", {study_rooms: all_study_rooms, page: "study_rooms"});
        }
    })
});

// CREATE - add new study room to DB
router.post("/", middleware.isLoggedIn, function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var new_study_room = {name: name, image: image, description: desc, author: author};
    Study_room.create(new_study_room, function (err, newlyCreated) {
        if (err){
            console.log(err);
        } else{
            res.redirect("./study_rooms");
        }
    })
});

// NEW - show the form to create new study room
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("study_rooms/new");
});

// SHOW - show info about one study room
router.get("/:id", function (req, res) {
    Study_room.findById(req.params.id).populate("comments").exec(function(err, found_study_room) {
        if (err || !found_study_room){
            req.flash("error", "study room not found");
            res.redirect("back");
        } else {
            res.render("study_rooms/show", {study_room: found_study_room});
        }
    });
});

// EDIT study_rooms ROUTE
router.get("/:id/edit", middleware.checkStudy_roomOwnership, function(req, res){
    Study_room.findById(req.params.id, function(err, foundStudy_room){
        res.render("study_rooms/edit", {study_room: foundStudy_room});
    });
});

// UPDATE study_room ROUTE
router.put("/:id", middleware.checkStudy_roomOwnership, function(req, res){
    // find and update the correct study_room
    Study_room.findByIdAndUpdate(req.params.id, req.body.study_room, function(err, updatedStudy_room){
        if(err){
            res.redirect("/study_rooms");
        } else {
            //redirect somewhere(show page)
            res.redirect("/study_rooms/" + req.params.id);
        }
    });
});

// DESTROY study_room ROUTE
router.delete("/:id", middleware.checkStudy_roomOwnership, function(req, res){
    Study_room.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/study_rooms");
        } else {
            res.redirect("/study_rooms");
        }
    });
});

module.exports = router;