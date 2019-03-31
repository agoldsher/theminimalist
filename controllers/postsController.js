const db = require("../models");

// Defining methods for the postsController
module.exports = {
    findAll: function (req, res) {
        db.Post
            .find(req.query)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Post
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findByCategory: function (req, res) {
        db.Post
            .find({ category: req.query })
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findByPopularity: function (req, res) {
        db.Post
            .find()
            .sort({ viewCount: -1 })
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
        db.Post
            .create({
                title: req.body.title,
                category: req.body.category,
                price: req.body.price,
                description: req.body.description,
                state: req.body.state,
                image:req.file.filename
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
    remove: function (req, res) {
        db.Post
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
