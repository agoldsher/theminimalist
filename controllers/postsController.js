const db = require("../models");

// Defining methods for the postsController
module.exports = {
    findAll: function (req, res) {
        db.Post
            .find({})
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Post
            .findById(req.params.id)
            .populate("user")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findByCategory: function (req, res) {
        db.Post
            .find({$and:[{city: req.params.city },{ category: req.params.category }]})
            .sort({ date: -1 })
            .then(dbModel => {res.json(dbModel)})
            .catch(err => res.status(422).json(err));
    },
    findByPopularity: function (req, res) {
        db.Post
            .find({city: req.params.city })
            .sort({ viewCount: -1 })
            .limit(10)
            .then(dbModel => res.json(dbModel))
            .catch(err => {
                res.status(422).json(err)
            });
    },
    updateViews:function (req,res){
            db.Post
            .findOneAndUpdate({ _id: req.params.id }, {$inc:{viewCount:1}})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    search: function (req, res){
        db.Post
            .find({$and:[{city: req.params.city },{title:{ $regex: req.params.search, $options: "i" } }]})
            .then(dbModel=>res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findByCity: function (req, res) {
        db.Post
            .find({ city: req.query })
            .sort({ date: -1 })
            .limit(10)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findByState: function (req, res) {
        db.Post
            .find({ state: req.query })
            .sort({ date: -1 })
            .limit(10)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        console.log(req.body);
        db.Post
            .create({
                title: req.body.title,
                category: req.body.category,
                price: req.body.price,
                description: req.body.description,
                city: req.body.city,
                state: req.body.state,
                zipcode: req.body.zipcode,
                image: req.file.filename,
                email:req.body.email,
                userName: req.body.userName
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.Post
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    getUserCity:function(req, res){
        db.User
            .find({_id:req.params.userID})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    updateCity: function (req, res) {
        db.User
            .findOneAndUpdate({_id: req.params.userID }, {city: req.params.city})
            .then((dbModel)=>{
                console.log("updated")
                res.json(dbModel)
            })
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Post
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
