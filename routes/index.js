const express = require("express")
const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
// API Routes
router.use("/api", apiRoutes);

if(process.env.NODE_ENV === "production") {
  express.static("../client/build")
}
// If no API routes are hit, send the React app
router.get("*",function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
