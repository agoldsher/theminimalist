const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    // user: {
    //     type: String,
    //     required: true
    // },
    title: {
        type: String,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    viewCount: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
    }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
