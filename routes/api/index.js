const router = require("express").Router();
const postRoutes = require("./posts");
const userRoutes = require("./users");

// Post routes
router.use("/posts", postRoutes);
router.use("/users", userRoutes);
// router.use("/login", userRoutes);

module.exports = router;
