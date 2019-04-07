require("dotenv").config();
const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: 'public/uploads' })
const postsController = require("../../controllers/postsController");
const fs= require("fs");
const cloud_name= process.env.CLOUDINARY_NAME;
const api_key= process.env.CLOUDINARY_KEY;
const api_secret = process.env.CLOUDINARY_SECRET;
const cloudinary = require("cloudinary");

uploadCDNY = (req, res, next) => {
    if(req.file) {
        cloudinary.uploader.upload(`public/uploads/${req.file.filename}`, function(result) {
            fs.unlink(`public/uploads/${req.file.filename}`, err => {
                if (err) throw err;
                console.log("file was successfully deleted");
            });
            req.file.filename = result.url;
            return next();
        });
    } else {
        return next();
    };
};
cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret
});

// Matches with "/api/posts"
router.route("/")
    .get(postsController.findAll)
    .post(upload.single('image'), uploadCDNY, postsController.create);

// Matches with "api/posts/category"
router.route("/category/:category/:city")
.get(postsController.findByCategory);

// Matches with "api/posts/popularity"
router.route("/popularity/:city")
.get(postsController.findByPopularity);

// Matches with "api/posts/city"
router.route("/city")
.get(postsController.findByCity)

router.route("/:userID/:city")
.put(postsController.updateCity)

router.route("/:userID")
.get(postsController.getUserCity);

// Matches with "api/posts/state"
router.route("/state")
.get(postsController.findByState);

router.route("/view/:id")
.put(postsController.updateViews);

router.route("/search/:search")
.get(postsController.search)

// Matches with "/api/posts/:id"
router.route("/:id")
.get(postsController.findById)
.put(postsController.update)
.delete(postsController.remove);


module.exports = router;