const router = require("express").Router();
const postRoutes = require("./posts");
const userRoutes = require("./user");
const zipCodeRoutes = require("./zipCode");

// Post routes
router.use("/posts", postRoutes);
router.use("/users", userRoutes);
router.use("/zipCode", zipCodeRoutes);

module.exports = router;
