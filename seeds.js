var mongoose = require("mongoose");
var Study_room = require("./models/study_room");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Leetcode",
        image: "https://leetcode.com/static/images/LeetCode_Sharing.png",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Fat burning work out",
        image: "https://i.pinimg.com/originals/b6/3d/ff/b63dff82048c175a6ab67542d563ec42.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Make up",
        image: "https://cdn.shopify.com/s/files/1/0189/7771/8372/products/kpop-Blackpink-ROSE-the-same-Black-Round-neck-hoodies-women-korean-wild-knitting-long-sleeve-sweatshirts_720x720.jpg?v=1573171704",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

function seedDB(){
    //Remove all campgrounds
    Study_room.deleteMany({}, function(err){
        // if(err){
        //     console.log(err);
        // }
        // console.log("removed study rooms!");
        // Comment.deleteMany({}, function(err) {
        //     if(err){
        //         console.log(err);
        //     }
        //     console.log("removed comments!");
        //     //add a few study rooms
        //     data.forEach(function(seed){
        //         Study_room.create(seed, function(err, study_room){
        //             if(err){
        //                 console.log(err)
        //             } else {
        //                 console.log("added a study room");
        //                 //create a comment
        //                 Comment.create(
        //                     {
        //                         text: "This study room is great",
        //                         author: "Homer"
        //                     }, function(err, comment){
        //                         if(err){
        //                             console.log(err);
        //                         } else {
        //                             study_room.comments.push(comment);
        //                             study_room.save();
        //                             console.log("Created new comment");
        //                         }
        //                     });
        //             }
        //         });
        //     });
        // });
    });
    //add a few comments
}

module.exports = seedDB;