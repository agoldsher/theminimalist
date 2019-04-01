const router = require("express").Router();

// Matches with "/api/posts"
router.route("/")
    .get(function(req,res,next){
        res.render('index', {layout: 'default'})
    })

module.exports = router
