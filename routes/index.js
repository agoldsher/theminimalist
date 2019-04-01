const express = require("express")
const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const preLogin = require("./preLogin")
const auth = require("./auth")

// require('../models/Users');
// require('../config/passport');


// router.route("/")
//     .get(function(req,res,next){
//         console.log("In hbs get /")
//         res.render('index', {layout: 'default'})
//     })

// API Routes
router.use('/login',preLogin)
router.use("/api", apiRoutes);

if(process.env.NODE_ENV === "production") {
  express.static("../client/build")
}


// If no API routes are hit, send the React app
router.get("*",auth.required,function (req, res) {
  console.log("React route hit.")
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
