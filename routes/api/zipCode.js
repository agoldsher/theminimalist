const express = require("express");
require("dotenv").config();
const axios = require("axios");
const router = express.Router();
const zipKey = process.env.zipCodeApi;

router.route("/")
    .post((req, res) => {
         axios.get(`https://www.zipcodeapi.com/rest/${zipKey}/info.json/${req.body.zipcode}/radians`)
            .then(response => res.send(response.data))
            .catch(err => console.log(err))
    });


module.exports = router;