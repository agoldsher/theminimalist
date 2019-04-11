const path = require("path");
const router = require("express").Router();

module.exports = function (passport){
// module.exports = function () {
  const apiRoutes = require("./api")(passport);
  // const apiRoutes = require("./api")();

  // API Routes
  router.use("/api", apiRoutes);

  // If no API routes are hit, send the React app
  router.use(function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });



  return router;
}