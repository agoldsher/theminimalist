const router = require("express").Router();
const bookRoutes = require("./api");

// Book routes
router.use("/api", bookRoutes);

module.exports = router;
