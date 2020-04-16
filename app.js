var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    flash       = require("connect-flash"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Study_room    = require("./models/study_room"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDB        = require("./seeds");

// requring routes
var commentRoutes    = require("./routes/comments"),
    study_roomRoutes = require("./routes/study_rooms"),
    indexRoutes      = require("./routes/index");

mongoose.connect("mongodb+srv://study-paradise:6sEKGKn2EezrZX2S@cluster0-7ulwf.mongodb.net/test?retryWrites=true&w=majority\n", { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false })
    .then(() => {
        console.log('Connected to DB!');
    }).catch(err => {
        console.log('ERROR:', err.message);
});

// development database
// mongoose.connect("mongodb://localhost/study_paradise", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Jenny is the best",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/study_rooms", study_roomRoutes);
app.use("/study_rooms/:id/comments", commentRoutes);

// app.listen(3000, "localhost", function () {
//     console.log("The study paradise server has started");
// });

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("The study paradise server has started");
});

// console.log(process.env);
// console.log(process.env.PORT);
