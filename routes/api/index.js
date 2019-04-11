const router = require("express").Router();
const postRoutes = require("./posts");
const userRoutes = require("./user");
const zipCodeRoutes = require("./zipCode");
// module.exports = function () {
    module.exports = function (passport) {

    // Post routes
    // router.use("/posts", postRoutes);
    router.use("/posts", passport.authenticate('jwt'), postRoutes);
    router.use("/users", userRoutes);
    // router.use("/zipCode", zipCodeRoutes);
    router.use("/zipCode", passport.authenticate('jwt'), zipCodeRoutes);


    return router;
}
