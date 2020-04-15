var express = require("express");
var router  = express.Router({mergeParams: true});
var Study_room = require("../models/study_room");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// comments new
router.get("/news", middleware.isLoggedIn, function(req, res){
    // find study_room by id
    Study_room.findById(req.params.id, function(err, study_room){
        if(err){
            console.log(err);
        } else {
            res.render("comments/news", {study_room: study_room});
        }
    })
});

// comments create
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup study_room using ID
    Study_room.findById(req.params.id, function(err, study_room){
        if(err){
            console.log(err);
            res.redirect("/study_rooms");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    study_room.comments.push(comment);
                    study_room.save();
                    req.flash("success", "Successfully added comment");
                    res.redirect('/study_rooms/' + study_room._id);
                }
            });
        }
    });
});

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Study_room.findById(req.params.id, function (err, foundStudy_room) {
        if (err || !foundStudy_room){
            req.flash("error", "No study room found");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                res.render("comments/edit", {study_room_id: req.params.id, comment: foundComment});
            }
        });
    });
});

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/study_rooms/" + req.params.id );
        }
    });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/study_rooms/" + req.params.id);
        }
    });
});

module.exports = router;